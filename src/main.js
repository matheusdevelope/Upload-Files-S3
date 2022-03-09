//require("dotenv/config");
const os = require("os");
const server = require("./index.js");
const { GetConfig, SetConfig } = require("./config.js");

let config = {
  base_url_api: process.env.BASE_URL,
  up_file_url_api: process.env.URL_UPLOADFILE,
  get_file_url_api: process.env.URL_DOWNLOADFILE,
  short_link_url_api: process.env.URL_SHORTER_URL,
  port_local_server: 3600,
};
const readline = require("readline");
const { normalize } = require("path");
const question = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function VerifyUser() {
  try {
    const user = await GetConfig();
    if (user) {
      function auth() {
        question.question(
          "Insira senha para iniciar o serviço:\n->",
          (input) => {
            if (input === user.pass) {
              server(user.port_local_server);
            } else {
              auth();
            }
          }
        );
      }
      if (user.pass) {
        auth();
      } else {
        server(user.port_local_server);
      }

      return;
    } else {
      console.log("Esse é o seu primeiro acesso do servidor.");
      CreatePass();
    }
  } catch (err) {
    return Promise.reject("Error Verify User...: ", err);
  }
}
async function CreatePass() {
  question.question(
    "\nDeseja criar uma senha de acesso? [s/n]\n->",
    (input) => {
      if (input.toLocaleLowerCase() === "s") {
        CreateUser();
      } else if (input.toLocaleLowerCase() === "n") {
        CreateAcessKeyIdAWS();
      } else {
        console.log("Opção invalida, tente novamente.");
        CreatePass();
      }
    }
  );
}
async function CreateUser() {
  question.question(
    `\nInsira uma senha de acesso (min 6 caracteres):
->`,
    (input) => {
      if (input.length >= 6) {
        config.pass = input;
        CreateAcessKeyIdAWS();
      } else {
        console.log("Senha muito curta!");
        CreateUser();
      }
    }
  );
}
async function CreateAcessKeyIdAWS() {
  question.question(
    `\nInsira a AccessKeyId AWS:
->`,
    (input) => {
      if (input.length >= 6) {
        config.accessKeyId = input;
        CreateAcessSecretKeyAWS();
      } else {
        console.log("AccessKeyId muito curta!");
        CreateAcessKeyIdAWS();
      }
    }
  );
}
async function CreateAcessSecretKeyAWS() {
  question.question(
    `\nInsira a SecretKey AWS:
->`,
    (input) => {
      if (input.length >= 6) {
        config.secretAccessKey = input;
        CreateBucketAWS();
      } else {
        console.log("AcessSecretKey muito curta!");
        CreateAcessSecretKeyAWS();
      }
    }
  );
}
async function CreateBucketAWS() {
  question.question(
    `\nNome do BUCKET S3 AWS:
->`,
    (input) => {
      if (input.length >= 6) {
        config.bucket = input;
        CreateRegionAWS();
      } else {
        console.log("Nome do bucket muito curto!");
        CreateBucketAWS();
      }
    }
  );
}
async function CreateRegionAWS() {
  question.question(
    `\nRegião do BUCKET S3 AWS:
->`,
    (input) => {
      if (input.length >= 6) {
        config.region = input;
        CreateTempFolder();
      } else {
        console.log("Nome da região muito curto!");
        CreateRegionAWS();
      }
    }
  );
}
async function CreateTempFolder() {
  question.question(
    `\nInsira o path da sua pasta temp para download dos arquivos: [${os.tmpdir()}]
  ->`,
    (input) => {
      if (input.length > 0) {
        config.pass = input;
        //CreateFTP();
        CreatePortLocal();
      } else {
        config.temp_dir = normalize(os.tmpdir());
        //CreateFTP();
        CreatePortLocal();
      }
    }
  );
}
async function CreateFTP() {
  console.log("\nPor favor insira as credenciais de acesso do FTP.");
  ///host:
  function host() {
    question.question("\nHOST->", (input) => {
      if (input.length > 8) {
        config.host_ftp = input;
        user();
      } else {
        console.log("O host FTP é muito curto, insira novamente.");
        host();
      }
    });
  }
  function user() {
    question.question("\nUSER->", (input) => {
      if (input.length > 1) {
        config.user_ftp = input;
        pass();
      } else {
        console.log("O usuário FTP é muito curto, insira novamente.");
        user();
      }
    });
  }
  function pass() {
    question.question("\nPASS->", (input) => {
      if (input.length > 2) {
        config.pass_ftp = input;
        port();
      } else {
        console.log("A senha do FTP é muito curta, insira novamente.");
        pass();
      }
    });
  }
  function port() {
    question.question("\nPORT[21]->", (input) => {
      if (input.length > 0) {
        config.port_ftp = Number(input) > 0 ? input : 21;
        // CreateAPI();
      } else {
        config.port_ftp = 21;
        // CreateAPI();
      }
    });
  }
  host();
}
async function CreateAPI() {
  console.log("\nPor favor insira os pontos de acesso da API online.");
  ///host:
  function base_url() {
    question.question(
      `\nBase URL [${config.base_url_api || ""}]->`,
      (input) => {
        if (input.length > 0) {
          config.base_url_api = input;
        }
        link_to_up_file();
        // else {
        //   console.log("A URL base é muito curta, insira novamente.");
        //   base_url();
        // }
      }
    );
  }
  function link_to_up_file() {
    question.question(
      `\nPath "Buscar Nome e Link Para Upload"[${
        config.up_file_url_api || ""
      }]->`,
      (input) => {
        if (input.length >= 1) {
          config.up_file_url_api = input;
        }
        link_to_get_file();
        // else {
        //   console.log("Path muito curto, insira novamente.");
        //   link_to_up_file();
        // }
      }
    );
  }
  function link_to_get_file() {
    question.question(
      `\nPath "Buscar Link de Download"[${config.get_file_url_api || ""}]->`,
      (input) => {
        if (input.length > 0) {
          config.get_file_url_api = input;
        }
        link_to_short_link();
        // else {
        //   console.log("Path muito curto, insira novamente.");
        //   link_to_get_file();
        // }
      }
    );
  }
  function link_to_short_link() {
    question.question(
      `\nPath "Buscar URL encurtada"[${config.short_link_url_api || ""}]->`,
      (input) => {
        if (input.length > 1) {
          config.short_link_url_api = input;
        }
        CreatePortLocal();
        // else {
        //   console.log("Path muito curto, insira novamente.");
        //   link_to_short_link();
        // }
      }
    );
  }
  base_url();
}
async function CreatePortLocal() {
  question.question(
    `\nInsira a porta de execução do serviço (>1000):
  [${config.port_local_server}]->`,
    async (input) => {
      if (input.length > 0) {
        if (Number(input) > 999) {
          config.port_local_server = Number(input);
          try {
            await SetConfig(config);
          } catch (e) {
            return Promise.reject(e);
          }
        } else {
          console.log("Porta inválida!");
          CreatePortLocal();
        }
      } else {
        config.port_local_server = Number(config.port_local_server);
        try {
          await SetConfig(config);
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }
  );
}

async function Exec() {
  try {
   // await VerifyUser();
    server(process.env.PORT_UPLOAD_FILES_S3)
  } catch (e) {
    console.log(e);
  }
}
Exec();
