"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartProcess = void 0;
var FTP = require("./FTP");
var fs = require("fs");
var aws = require("aws-sdk");
var path = require("path");
var mime = require("mime-types");
var NewLog = require("../handler_logs").NewLog;
var config_1 = require("./config");
var _a = require("./utils"), round = _a.round, error = _a.error, MountMessageEncoded = _a.MountMessageEncoded, Convert_Especial_Caracteres_in_Unicod_To_UTF8 = _a.Convert_Especial_Caracteres_in_Unicod_To_UTF8, GenererateNameFileUnique = _a.GenererateNameFileUnique;
var BUCKET;
(0, config_1.GetConfig)().then(function (config) {
    BUCKET = process.env.BUCKET || config.bucket;
    var CRETENTIALS = {
        secretAccessKey: process.env.ACCESS_SECRET || config.secretAccessKey,
        accessKeyId: process.env.ACCESS_KEY || config.accessKeyId,
        region: process.env.REGION || config.region,
    };
    aws.config.update(CRETENTIALS);
});
function StartProcess(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var retorno, list_path_files_local, list_name_files, files, deleted_files, message_encoded_URI, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    retorno = {
                        message: "Humm... não houveram erros de validação porém nenhum resultado foi retornado. Acho que ruim kkkkk",
                        data: {},
                        exceptions: "none",
                    };
                    list_path_files_local = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, ValidateRequisition(req.body)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, CreateListNames(req.body.files)];
                case 3:
                    list_name_files = _a.sent();
                    if (!list_name_files || list_name_files.length <= 0)
                        return [2 /*return*/, error({
                                message: "Lista de nomes dos arquivos recebidos na requisição retornou [empty]",
                            })];
                    return [4 /*yield*/, DownloadToLocalFromFTP(req.body.ftp, list_name_files)];
                case 4:
                    list_path_files_local = _a.sent();
                    if (!list_path_files_local || list_path_files_local.length <= 0)
                        return [2 /*return*/, error({
                                message: "Lista de paths dos arquivos baixados do FTP localmente retornou [empty]",
                            })];
                    if (!req.body.expiration)
                        req.body.expiration = 30;
                    if (!req.body.hash_size)
                        req.body.hash_size = 5;
                    return [4 /*yield*/, UploadFiles(list_path_files_local, req.body.hash_size, round(req.body.expiration, 5) || 30, req.body.files)];
                case 5:
                    files = _a.sent();
                    if (!files || files.length <= 0)
                        return [2 /*return*/, error({
                                message: "Lista dos arquivos enviado para a nuvem retornou [empty]",
                            })];
                    if (!(req.body.ftp.delete_files === true)) return [3 /*break*/, 7];
                    return [4 /*yield*/, DeleteFilesOnFTP(req.body.ftp, list_name_files)];
                case 6:
                    deleted_files = _a.sent();
                    retorno.exceptions = {
                        message: "Erro ao deletar arquivos no FTP",
                        error: deleted_files,
                    };
                    _a.label = 7;
                case 7:
                    message_encoded_URI = MountMessageEncoded(req.body.header_message, files, req.body.hash_size, req.body.footer_message);
                    retorno = {
                        message: "Success!",
                        data: {
                            files: files,
                            message_encoded_URI: message_encoded_URI,
                        },
                        exceptions: "none",
                    };
                    return [3 /*break*/, 9];
                case 8:
                    e_1 = _a.sent();
                    NewLog({
                        requester: req.body.requester,
                        type: "error",
                        sector: "AWS - Error",
                        data: e_1,
                    }).catch(function (e) { return console.error(e); });
                    return [2 /*return*/, Promise.reject(e_1)];
                case 9:
                    retorno.requester = req.body.requester;
                    return [4 /*yield*/, NewLog({
                            requester: req.body.requester,
                            type: "success",
                            sector: "AWS - Finish",
                            data: { res: retorno, req: req.body },
                        })];
                case 10:
                    _a.sent();
                    DeleteTempFileLocal(list_path_files_local);
                    return [2 /*return*/, retorno];
            }
        });
    });
}
exports.StartProcess = StartProcess;
function ValidateRequisition(body) {
    return __awaiter(this, void 0, void 0, function () {
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
                    message: "Você precisa enviar um array contendo os dados dos arquivos, o array enviado está vazio.",
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
            body.files.forEach(function (element) {
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
                        message: "Você precisa enviar o nome do arquivo com a extensão (.ext)",
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
                    message: "Você precisa informar a pasta onde os arquivos solicitados estão no FTP",
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
        var errors;
        return __generator(this, function (_a) {
            errors = [];
            CheckFiles();
            CheckFTP();
            if (!body.requester)
                return [2 /*return*/, error({
                        message: "Requester not provided, you need send that information to use this API",
                        fix: "send a propertie [requester:'your_name'] with your info",
                        body_received: body,
                    })];
            if (errors.length > 0)
                return [2 /*return*/, error({
                        message: "Corpo da requisição inválido, erros encontrados: ",
                        erros: errors,
                        body_received: body,
                    })];
            return [2 /*return*/];
        });
    });
}
function CreateListNames(files) {
    return __awaiter(this, void 0, void 0, function () {
        var list;
        return __generator(this, function (_a) {
            list = [];
            try {
                files.forEach(function (file) {
                    list.push(Convert_Especial_Caracteres_in_Unicod_To_UTF8(file.name));
                });
            }
            catch (e) {
                return [2 /*return*/, error({
                        message: "Falha ao criar lista de nomes para consulta no FTP",
                        error: e,
                    })];
            }
            return [2 /*return*/, list];
        });
    });
}
function DownloadToLocalFromFTP(connection, files) {
    return __awaiter(this, void 0, void 0, function () {
        var list_of_paths_local, erros, i, path_Local, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    list_of_paths_local = [];
                    erros = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < files.length)) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, FTP.DownloadoFromFTP(connection, files[i])];
                case 3:
                    path_Local = _a.sent();
                    list_of_paths_local.push(path_Local);
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    if (e_2.code === 530) {
                        erros = [
                            {
                                message: "Falha no Login FTP, verique as credenciais enviadas e tente novamente.",
                                error: e_2,
                            },
                        ];
                    }
                    else {
                        erros.push({
                            message: "Erro ao fazer o download do arquivo: " +
                                (connection.host_ftp + connection.path_of_files + files[i]).replace(/%20/gm, " "),
                            error: e_2,
                        });
                    }
                    return [3 /*break*/, 5];
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6:
                    if (erros.length > 0)
                        return [2 /*return*/, error({
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
                            })];
                    return [2 /*return*/, list_of_paths_local];
            }
        });
    });
}
function UploadFiles(list_paths_local, hash_size, expires, req_files) {
    return __awaiter(this, void 0, void 0, function () {
        var erros, files_with_link_download, i, name_file, ret, file_with_link, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    erros = [];
                    files_with_link_download = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < list_paths_local.length)) return [3 /*break*/, 6];
                    name_file = GenererateNameFileUnique(list_paths_local[i], hash_size, expires);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, UpFileAWS_S3(list_paths_local[i], name_file, expires)];
                case 3:
                    ret = _a.sent();
                    file_with_link = {
                        name: ret.Key,
                        disable_auto_format: req_files[i].disable_auto_format || false,
                        description_name: req_files[i].description_name || "",
                        description_after_link: req_files[i].description_after_link || "",
                        url: ret.Location,
                        expiration: expires,
                    };
                    files_with_link_download.push(file_with_link);
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _a.sent();
                    erros.push({
                        message: "Erro ao fazer o upload do arquivo para a nuvem.",
                        files: path.basename(list_paths_local[i]),
                        error: e_3,
                    });
                    return [3 /*break*/, 5];
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6:
                    if (erros.length > 0)
                        return [2 /*return*/, error({
                                message: "Erro ao fazer o upload dos arquivos para a nuvem. Contate o provedor da API",
                                error: erros,
                            })];
                    return [2 /*return*/, files_with_link_download];
            }
        });
    });
}
function UpFileAWS_S3(path_local, key, expires) {
    return __awaiter(this, void 0, void 0, function () {
        var s3, fileStream, type, uploadParams, RetornoS3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    s3 = new aws.S3();
                    fileStream = fs.createReadStream(path_local);
                    type = mime.contentType(path.extname(path_local));
                    uploadParams = {
                        Bucket: BUCKET,
                        Key: key,
                        Body: fileStream,
                        ACL: "public-read",
                        Tagging: "expires=" + expires,
                        ContentType: type || "application/pdf",
                    };
                    return [4 /*yield*/, s3
                            .upload(uploadParams, function (err, data) {
                            if (err) {
                                error(err);
                            }
                        })
                            .promise()];
                case 1:
                    RetornoS3 = _a.sent();
                    return [2 /*return*/, RetornoS3];
            }
        });
    });
}
function DeleteFilesOnFTP(connection, files) {
    return __awaiter(this, void 0, void 0, function () {
        var list_of_paths_local, erros, i, path_Local, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    list_of_paths_local = [];
                    erros = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < files.length)) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, FTP.DeleteOnFTP(connection, files[i])];
                case 3:
                    path_Local = _a.sent();
                    list_of_paths_local.push(path_Local);
                    return [3 /*break*/, 5];
                case 4:
                    e_4 = _a.sent();
                    erros.push({
                        message: "Erro ao excluir arquivo: " +
                            connection.host_ftp +
                            connection.path_of_files +
                            files[i],
                        error: e_4,
                    });
                    return [3 /*break*/, 5];
                case 5:
                    i++;
                    return [3 /*break*/, 1];
                case 6:
                    if (erros.length > 0)
                        return [2 /*return*/, error({
                                message: "Erro ao fazer a exclusão dos arquivos no FTP",
                                more: "Veja a descrição do erro no site a seguir: https://en.wikipedia.org/wiki/List_of_FTP_server_return_codes",
                                error: erros,
                            })];
                    return [2 /*return*/, list_of_paths_local];
            }
        });
    });
}
function DeleteTempFileLocal(list_paths_files) {
    for (var i = 0; i < list_paths_files.length; i++) {
        fs.unlink(list_paths_files[i], function (error) {
            if (error)
                console.log(error);
            //  console.log("Deleted temp file: " + list_paths_files[i]);
        });
    }
}
