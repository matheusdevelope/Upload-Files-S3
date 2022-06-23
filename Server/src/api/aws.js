const FTP = require("./FTP");
const fs = require("fs");
const aws = require("aws-sdk");
const path = require("path");
const mime = require("mime-types");
const { NewLog } = require("../handler_logs");

import { GetConfig } from "./config";
const {
  round,
  error,
  MountMessageEncoded,
  Convert_Especial_Caracteres_in_Unicod_To_UTF8,
  GenererateNameFileUnique,
} = require("./utils");
let BUCKET;
GetConfig().then((config) => {
  BUCKET = process.env.BUCKET || config.bucket;
  const CRETENTIALS = {
    secretAccessKey: process.env.ACCESS_SECRET || config.secretAccessKey,
    accessKeyId: process.env.ACCESS_KEY || config.accessKeyId,
    region: process.env.REGION || config.region,
  };
  aws.config.update(CRETENTIALS);
});

async function StartProcess(req, res) {
  let retorno = {
    message:
      "Humm... não houveram erros de validação porém nenhum resultado foi retornado. Acho que ruim kkkkk",
    data: {},
    exceptions: "none",
  };
  let list_path_files_local = [];
  try {
    await ValidateRequisition(req.body);
    const list_name_files = await CreateListNames(req.body.files);
    if (!list_name_files || list_name_files.length <= 0)
      return error({
        message:
          "Lista de nomes dos arquivos recebidos na requisição retornou [empty]",
      });
    list_path_files_local = await DownloadToLocalFromFTP(
      req.body.ftp,
      list_name_files
    );
    if (!list_path_files_local || list_path_files_local.length <= 0)
      return error({
        message:
          "Lista de paths dos arquivos baixados do FTP localmente retornou [empty]",
      });
    if (!req.body.expiration) req.body.expiration = 30;
    if (!req.body.hash_size) req.body.hash_size = 5;
    const files = await UploadFiles(
      list_path_files_local,
      req.body.hash_size,
      round(req.body.expiration, 5) || 30,
      req.body.files
    );
    if (!files || files.length <= 0)
      return error({
        message: "Lista dos arquivos enviado para a nuvem retornou [empty]",
      });

    if (req.body.ftp.delete_files === true) {
      const deleted_files = await DeleteFilesOnFTP(
        req.body.ftp,
        list_name_files
      );

      retorno.exceptions = {
        message: "Erro ao deletar arquivos no FTP",
        error: deleted_files,
      };
    }
    //new commit
    const message_encoded_URI = MountMessageEncoded(
      req.body.header_message,
      files,
      req.body.hash_size,
      req.body.footer_message
    );

    retorno = {
      message: "Success!",
      data: {
        files: files,
        message_encoded_URI: message_encoded_URI,
      },
      exceptions: "none",
    };
  } catch (e) {
    console.log('Aqui')
    NewLog({
      requester: req.body.requester,
      type: "error",
      sector: "AWS - Error",
      data: e,
    }).catch(e=>console.error(e))
    Promise.reject(e);
  }

  retorno.requester = req.body.requester;
  await NewLog({
    requester: req.body.requester,
    type: "success",
    sector: "AWS - Finish",
    data: { res: retorno, req: req.body },
  });
  DeleteTempFileLocal(list_path_files_local);
  return retorno;
}
async function ValidateRequisition(body) {
  let errors = [];

  function CheckFiles() {
    if (!body.files)
      return errors.push({
        propriedade: "files",
        message: "Você precisa enviar um array contendo os dados dos arquivos",
        expected: {
          files: [
            {
              name: "nome-arquivo.png",
            },
            {
              name: "nome-arquivo2.pdf",
            },
          ],
        },
        received: "none",
      });

    if (body.files.length < 1)
      errors.push({
        propriedade: "files",
        message:
          "Você precisa enviar um array contendo os dados dos arquivos, o array enviado está vazio.",
        expected: {
          files: [
            {
              name: "nome-arquivo.png",
            },
            {
              name: "nome-arquivo2.pdf",
            },
          ],
        },
        received: [],
      });
    CheckName();
  }
  function CheckName() {
    body.files.forEach((element) => {
      if (!element.name)
        return errors.push({
          propriedade: "files[i].name",
          message: "Você precisa enviar o nome do arquivo",
          expected: {
            name: "nome-arquivo.png",
          },
          received: element,
        });
      if (element.name.split(".").length < 2)
        errors.push({
          propriedade: "files[i].name",
          message:
            "Você precisa enviar o nome do arquivo com a extensão (.ext)",
          expected: {
            files: [
              {
                name: "nome-arquivo.png",
              },
            ],
          },
          received: element,
        });
    });
  }
  function CheckFTP() {
    if (!body.ftp)
      return errors.push({
        propriedade: "ftp",
        message: "Você precisa informar os dados do FTP",
        expected: {
          ftp: {
            host_ftp: "seu_host.com.br",
            user_ftp: "user",
            pass_ftp: "pass",
            path_of_files: "/user/files/images/",
          },
        },
        received: "none",
      });
    if (!body.ftp.host_ftp)
      errors.push({
        propriedade: "ftp.host_ftp",
        message: "Você precisa informar os dados do HOST do FTP",
        expected: {
          ftp: {
            host_ftp: "seu_host.com.br",
            user_ftp: "user",
            pass_ftp: "pass",
            path_of_files: "/user/files/images/",
          },
        },
        received: body.ftp,
      });
    if (!body.ftp.user_ftp)
      errors.push({
        propriedade: "ftp.user_ftp",
        message: "Você precisa informar os dados do USER do FTP",
        expected: {
          ftp: {
            host_ftp: "seu_host.com.br",
            user_ftp: "user",
            pass_ftp: "pass",
            path_of_files: "/user/files/images/",
          },
        },
        received: body.ftp,
      });
    if (!body.ftp.pass_ftp)
      errors.push({
        propriedade: "ftp.pass_ftp",
        message: "Você precisa informar os dados de PASS do FTP",
        expected: {
          ftp: {
            host_ftp: "seu_host.com.br",
            user_ftp: "user",
            pass_ftp: "pass",
            path_of_files: "/user/files/images/",
          },
        },
        received: body.ftp,
      });
    if (!body.ftp.path_of_files)
      errors.push({
        propriedade: "ftp.path_of_files",
        message:
          "Você precisa informar a pasta onde os arquivos solicitados estão no FTP",
        expected: {
          ftp: {
            host_ftp: "seu_host.com.br",
            user_ftp: "user",
            pass_ftp: "pass",
            path_of_files: "/user/files/images/",
          },
        },
        received: body.ftp,
      });
  }

  CheckFiles();
  CheckFTP();
  if (!body.requester)
    return error({
      message:
        "Requester not provided, you need send that information to use this API",
      fix: "send a propertie [requester:'your_name'] with your info",
      body_received: body,
    });

  if (errors.length > 0)
    return error({
      message: "Corpo da requisição inválido, erros encontrados: ",
      erros: errors,
      body_received: body,
    });
}
async function CreateListNames(files) {
  let list = [];
  try {
    files.forEach((file) => {
      list.push(Convert_Especial_Caracteres_in_Unicod_To_UTF8(file.name));
    });
  } catch (e) {
    return error({
      message: "Falha ao criar lista de nomes para consulta no FTP",
      error: e,
    });
  }
  return list;
}
async function DownloadToLocalFromFTP(connection, files) {
  let list_of_paths_local = [];
  let erros = [];
  for (let i = 0; i < files.length; i++) {
    try {
      const path_Local = await FTP.DownloadoFromFTP(connection, files[i]);
      list_of_paths_local.push(path_Local);
    } catch (e) {
      if (e.code === 530) {
        erros = [
          {
            message:
              "Falha no Login FTP, verique as credenciais enviadas e tente novamente.",
            error: e,
          },
        ];
      } else {
        erros.push({
          message:
            "Erro ao fazer o download do arquivo: " +
            (connection.host_ftp + connection.path_of_files + files[i]).replace(
              /%20/gm,
              " "
            ),
          error: e,
        });
      }
    }
  }
  if (erros.length > 0)
    return error({
      message: "Erro ao fazer o download dos arquivos no FTP",
      more: "Veja a descrição do erro no site a seguir: https://en.wikipedia.org/wiki/List_of_FTP_server_return_codes",
      error: erros,
      common_errors: {
        530: "Not logged in.",
        532: "Need account for storing files.",
        534: "Could Not Connect to Server - Policy Requires SSL",
        550: "Requested action not taken. File unavailable (e.g., file not found, no access).",
        551: "Requested action aborted. Page type unknown.",
        552: "Requested file action aborted. Exceeded storage allocation (for current directory or dataset).",
        553: "Requested action not taken. File name not allowed.",
      },
    });
  return list_of_paths_local;
}
async function UploadFiles(list_paths_local, hash_size, expires, req_files) {
  let erros = [];
  let files_with_link_download = [];
  for (let i = 0; i < list_paths_local.length; i++) {
    const name_file = GenererateNameFileUnique(
      list_paths_local[i],
      hash_size,
      expires
    );
    try {
      const ret = await UpFileAWS_S3(list_paths_local[i], name_file, expires);
      const file_with_link = {
        name: ret.Key,
        description_name: req_files[i].description_name || "",
        url: ret.Location,
        expiration: expires,
      };
      files_with_link_download.push(file_with_link);
    } catch (e) {
      erros.push({
        message: "Erro ao fazer o upload do arquivo para a nuvem.",
        files: path.basename(list_paths_local[i]),
        error: e,
      });
    }
  }
  if (erros.length > 0)
    return error({
      message:
        "Erro ao fazer o upload dos arquivos para a nuvem. Contate o provedor da API",
      error: erros,
    });

  return files_with_link_download;
}
async function UpFileAWS_S3(path_local, key, expires) {
  const s3 = new aws.S3();
  const fileStream = fs.createReadStream(path_local);
  const type = mime.contentType(path.extname(path_local));
  const uploadParams = {
    Bucket: BUCKET,
    Key: key,
    Body: fileStream,
    ACL: "public-read",
    Tagging: "expires=" + expires,
    ContentType: type || "application/pdf",
  };
  const RetornoS3 = await s3
    .upload(uploadParams, function (err, data) {
      if (err) {
        error(err);
      }
    })
    .promise();
  return RetornoS3;
}
async function DeleteFilesOnFTP(connection, files) {
  let list_of_paths_local = [];
  let erros = [];
  for (let i = 0; i < files.length; i++) {
    try {
      const path_Local = await FTP.DeleteOnFTP(connection, files[i]);
      list_of_paths_local.push(path_Local);
    } catch (e) {
      erros.push({
        message:
          "Erro ao excluir arquivo: " +
          connection.host_ftp +
          connection.path_of_files +
          files[i],
        error: e,
      });
    }
  }
  if (erros.length > 0)
    return error({
      message: "Erro ao fazer a exclusão dos arquivos no FTP",
      more: "Veja a descrição do erro no site a seguir: https://en.wikipedia.org/wiki/List_of_FTP_server_return_codes",
      error: erros,
    });
  return list_of_paths_local;
}
function DeleteTempFileLocal(list_paths_files) {
  for (let i = 0; i < list_paths_files.length; i++) {
    fs.unlink(list_paths_files[i], (error) => {
      if (error) console.log(error);
      //  console.log("Deleted temp file: " + list_paths_files[i]);
    });
  }
}

export { StartProcess };
