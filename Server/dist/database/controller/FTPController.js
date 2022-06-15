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
exports.FtpController = void 0;
var data_source_1 = require("../data-source");
var uuid_1 = require("uuid");
var FTP_1 = require("../entity/FTP");
var FtpController = /** @class */ (function () {
    function FtpController() {
        this.ftpRepository = data_source_1.AppDataSource.getRepository(FTP_1.FTP);
    }
    // async Exists(cnpj: string) {
    //   const ftp = await this.ftpRepository.findOneBy({ cnpj });
    //   if (ftp)
    //     return Promise.reject({
    //       message: "This CNPJ already exists",
    //     });
    // }
    FtpController.prototype.all = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.ftpRepository.find()];
            });
        });
    };
    FtpController.prototype.one = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var ftp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ftpRepository.find({
                            where: {
                                id: request.params.id,
                            },
                        })];
                    case 1:
                        ftp = _a.sent();
                        if (!ftp)
                            return [2 /*return*/, Promise.reject({ message: "ftp not found" })];
                        return [2 /*return*/, Promise.resolve(ftp[0])];
                }
            });
        });
    };
    FtpController.prototype.save = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    //  await this.Exists(request.body.cnpj);
                    request.body.id = (0, uuid_1.v4)();
                    return [2 /*return*/, this.ftpRepository.save(request.body)];
                }
                catch (e) {
                    return [2 /*return*/, Promise.reject(e)];
                }
                return [2 /*return*/];
            });
        });
    };
    // async update(request: Request, response: Response, next: NextFunction) {
    //   try {
    //     let ftpToUpdate = await this.ftpRepository.findOneBy({
    //       id: request.params.id,
    //     });
    //     if (!ftpToUpdate) return Promise.reject({ message: "ftp not found" });
    //     const ftp = await this.ftpRepository.findOneBy({
    //       cnpj: request.body.cnpj,
    //     });
    //     if (ftp && ftp.id !== request.params.id)
    //       return Promise.reject({
    //         message: "This CNPJ is already in use, try another.",
    //       });
    //     if (request.body.ftp?.length > 0) {
    //       const ftp = AppDataSource.getRepository(FTP);
    //       const objFTP = new FTP();
    //       await ftp.delete({ ftpId: request.body.id });
    //       for (let i = 0; i < request.body.ftp.length; i++) {
    //         let bodyFTP = request.body.ftp[i];
    //         objFTP.ftpId = request.body;
    //         await ftp.save({ ...objFTP, ...bodyFTP });
    //       }
    //     }
    //     delete request.body.ftp;
    //     return this.ftpRepository.update(
    //       {
    //         id: request.params.id,
    //       },
    //       request.body
    //     );
    //   } catch (e) {
    //     console.log(e);
    //     return Promise.reject(e);
    //   }
    // }
    FtpController.prototype.remove = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var ftpToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ftpRepository.findOneBy({
                            id: request.params.id,
                        })];
                    case 1:
                        ftpToRemove = _a.sent();
                        if (!ftpToRemove)
                            return [2 /*return*/, Promise.reject({ message: "ftp not found" })];
                        return [2 /*return*/, this.ftpRepository.remove(ftpToRemove)];
                }
            });
        });
    };
    return FtpController;
}());
exports.FtpController = FtpController;
