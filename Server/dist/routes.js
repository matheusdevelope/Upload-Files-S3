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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
var ManagerController_1 = require("./database/controller/ManagerController");
var UserController_1 = require("./database/controller/UserController");
var FTPController_1 = require("./database/controller/FTPController");
var aws_1 = require("./api/aws");
var Manager = [
    {
        method: "get",
        route: "/api/manager",
        controller: ManagerController_1.ManagerController,
        action: "all",
    },
    {
        method: "get",
        route: "/api/manager/:id",
        controller: ManagerController_1.ManagerController,
        action: "one",
    },
    {
        method: "post",
        route: "/api/manager",
        controller: ManagerController_1.ManagerController,
        action: "save",
    },
    {
        method: "post",
        route: "/api/manager/login",
        controller: ManagerController_1.ManagerController,
        action: "login",
    },
    {
        method: "put",
        route: "/api/manager/:id",
        controller: ManagerController_1.ManagerController,
        action: "update",
    },
    {
        method: "delete",
        route: "/api/manager/:id",
        controller: ManagerController_1.ManagerController,
        action: "remove",
    },
];
var User = [
    {
        method: "get",
        route: "/api/user",
        controller: UserController_1.UserController,
        action: "all",
    },
    {
        method: "get",
        route: "/api/user/:id",
        controller: UserController_1.UserController,
        action: "one",
    },
    {
        method: "post",
        route: "/api/user",
        controller: UserController_1.UserController,
        action: "save",
    },
    {
        method: "put",
        route: "/api/user/:id",
        controller: UserController_1.UserController,
        action: "update",
    },
    {
        method: "delete",
        route: "/api/user/:id",
        controller: UserController_1.UserController,
        action: "remove",
    },
];
var FTP = [
    {
        method: "get",
        route: "/api/ftp",
        controller: FTPController_1.FtpController,
        action: "all",
    },
    {
        method: "get",
        route: "/api/ftp/:id",
        controller: FTPController_1.FtpController,
        action: "one",
    },
    {
        method: "post",
        route: "/api/ftp",
        controller: FTPController_1.FtpController,
        action: "save",
    },
    {
        method: "put",
        route: "/api/ftp/:id",
        controller: FTPController_1.FtpController,
        action: "update",
    },
    {
        method: "delete",
        route: "/api/ftp/:id",
        controller: FTPController_1.FtpController,
        action: "remove",
    },
];
var EntryPoint = /** @class */ (function () {
    function EntryPoint() {
    }
    EntryPoint.prototype.entry = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve("Server is ON, use the [help] endpoint to more details.")];
            });
        });
    };
    EntryPoint.prototype.help = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve({
                        message: "Working, server is online!",
                        available_endepoints: {
                            up_file_ftp: {
                                method: "POST",
                                details: "Connect to the user FTP and search the files to make them available to public download with a link.",
                                expected_body: {
                                    requester: "your_name",
                                    files: [
                                        {
                                            name: "name-file.zip",
                                        },
                                    ],
                                    ftp: {
                                        host_ftp: "you_ftp_host.com.br",
                                        user_ftp: "your_user",
                                        pass_ftp: "your_pass",
                                        path_of_files: "/user/your_dir_files/",
                                        delete_files: "true/false",
                                    },
                                    hash_size: 5,
                                    expiration: 5,
                                    header_message: "This allow to add a custom message on top of message generate with the descriptions and links in URI Encode format",
                                    footer_message: "This allow to add a custom message on bottom of message generate with the  descriptions and links in URI Encode format",
                                },
                                requisited_values: {
                                    files: [
                                        {
                                            name: "The name needs a extension. If you dont provide it will throw a error on request. ",
                                        },
                                    ],
                                    ftp: {
                                        host_ftp: "Don't put the [ftp://] on init of the host, and dont put the [/] on the final of host.",
                                        path_of_files: "Always put the [/] on init and final of the path",
                                        delete_files: "Thats allow the API to delete the file after the upload success. Default value is [false]",
                                    },
                                },
                                optional_properties: {
                                    hash_size: {
                                        required: false,
                                        default_value: 5,
                                        details: "when you not provide the size of hash, it takes the default value 5, thats make the name file unique.",
                                    },
                                    expiration: {
                                        required: false,
                                        default_value: 30,
                                        details: "This propertie set the value of days that file is available to download, after this time, we delete the file on cloud.",
                                        details2: "The expiration times its always multiple of 5. Example: your send 3, the expiration will be 5, another example: you send 27, the expiration will be 30. We always make a round of the sended value.",
                                    },
                                    delete_files: {
                                        required: false,
                                        default_value: false,
                                        details: "Thats allow the API to delete the file after the upload success. If we cant delete the file, it will send a propertie [exception] to alert you about the failed on delete.",
                                    },
                                    header_message: {
                                        required: false,
                                        defalt_value: "",
                                        details: "to send line breaks in the message you can type ' n' (without space) or '[n]', then we convert to a line break. ",
                                    },
                                    footer_message: {
                                        required: false,
                                        defalt_value: "",
                                        details: "to send line breaks in the message you can type ' n' (without space) or '[n]', then we convert to a line break. ",
                                    },
                                },
                                return_values: {
                                    on_success: {
                                        message: "Success!",
                                        data: {
                                            files: [
                                                {
                                                    name: "name-your-file_94e86_5.zip",
                                                    url: "https://endpoint.com/name-your-file_94e86_5.zip",
                                                    expiration: 5,
                                                },
                                            ],
                                            message_encoded_URI: "%%20Test%%20with%%20simbol%%20of%%20%%25%%0A%%0Ahave%%20a%%20line%%20de%%20Break!%%0A%%0A-Name%%20of%%20File%%3A%%0Ahttps%%3A%%2F%%2Fyour-host.com%%2FYour-File.pdf%%0A%%0A",
                                        },
                                        exceptions: "none",
                                    },
                                    on_error: {
                                        message: "Error on make something",
                                        more: "Mode details of the error",
                                        error: [
                                            {
                                                message: "Erro on download file: your_ftp_personal.com.br/user/files/file.zip",
                                                error: {
                                                    name: "FTPError",
                                                    code: 550,
                                                },
                                            },
                                        ],
                                        common_errors: {
                                            550: "Requested action not taken. File unavailable (e.g., file not found, no access).",
                                        },
                                    },
                                },
                            },
                        },
                    })];
            });
        });
    };
    EntryPoint.prototype.up_file_ftp = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, aws_1.StartProcess)(request, response)];
            });
        });
    };
    return EntryPoint;
}());
exports.Routes = __spreadArray(__spreadArray(__spreadArray([
    // {
    //   method: "get",
    //   route: "/",
    //   controller: EntryPoint,
    //   action: "entry",
    // },
    {
        method: "get",
        route: "/help",
        controller: EntryPoint,
        action: "help",
    },
    {
        method: "post",
        route: "/up_file_ftp",
        controller: EntryPoint,
        action: "up_file_ftp",
    }
], Manager, true), User, true), FTP, true);
