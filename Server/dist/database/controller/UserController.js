"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.UserController = void 0;
var User_1 = require("../entity/User");
var data_source_1 = require("../data-source");
var uuid_1 = require("uuid");
var FTP_1 = require("../entity/FTP");
var UserController = /** @class */ (function () {
    function UserController() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    UserController.prototype.Exists = function (cnpj) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneBy({ cnpj: cnpj })];
                    case 1:
                        user = _a.sent();
                        if (user)
                            return [2 /*return*/, Promise.reject({
                                    message: "This CNPJ already exists",
                                })];
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.Auth = function (requester_cnpj) {
        return __awaiter(this, void 0, void 0, function () {
            var cnpj;
            return __generator(this, function (_a) {
                cnpj = requester_cnpj.replace(/[^0-9]/g, "") || "";
                return [2 /*return*/, this.userRepository.findOneBy({ cnpj: cnpj })];
            });
        });
    };
    UserController.prototype.all = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userRepository.find({ relations: ["ftp"] })];
            });
        });
    };
    UserController.prototype.one = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.find({
                            where: {
                                id: request.params.id,
                            },
                            relations: ["ftp"],
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, Promise.reject({ message: "User not found" })];
                        return [2 /*return*/, Promise.resolve(user[0])];
                }
            });
        });
    };
    UserController.prototype.save = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var cnpj, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        cnpj = request.body.cnpj.replace(/[^0-9]/g, "") || "";
                        return [4 /*yield*/, this.Exists(request.body.cnpj)];
                    case 1:
                        _a.sent();
                        request.body.id = (0, uuid_1.v4)();
                        return [2 /*return*/, this.userRepository.save(__assign(__assign({}, request.body), { cnpj: cnpj }))];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.update = function (request, response, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userToUpdate, user, ftp, objFTP, i, bodyFTP, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, this.userRepository.findOneBy({
                                id: request.params.id,
                            })];
                    case 1:
                        userToUpdate = _b.sent();
                        if (!userToUpdate)
                            return [2 /*return*/, Promise.reject({ message: "User not found" })];
                        return [4 /*yield*/, this.userRepository.findOneBy({
                                cnpj: request.body.cnpj,
                            })];
                    case 2:
                        user = _b.sent();
                        if (user && user.id !== request.params.id)
                            return [2 /*return*/, Promise.reject({
                                    message: "This CNPJ is already in use, try another.",
                                })];
                        if (!(((_a = request.body.ftp) === null || _a === void 0 ? void 0 : _a.length) > 0)) return [3 /*break*/, 7];
                        ftp = data_source_1.AppDataSource.getRepository(FTP_1.FTP);
                        objFTP = new FTP_1.FTP();
                        return [4 /*yield*/, ftp.delete({ userId: request.body.id })];
                    case 3:
                        _b.sent();
                        i = 0;
                        _b.label = 4;
                    case 4:
                        if (!(i < request.body.ftp.length)) return [3 /*break*/, 7];
                        bodyFTP = request.body.ftp[i];
                        objFTP.userId = request.body;
                        return [4 /*yield*/, ftp.save(__assign(__assign({}, objFTP), bodyFTP))];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7:
                        delete request.body.ftp;
                        return [2 /*return*/, this.userRepository.update({
                                id: request.params.id,
                            }, request.body)];
                    case 8:
                        e_2 = _b.sent();
                        console.log(e_2);
                        return [2 /*return*/, Promise.reject(e_2)];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.remove = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneBy({
                            id: request.params.id,
                        })];
                    case 1:
                        userToRemove = _a.sent();
                        if (!userToRemove)
                            return [2 /*return*/, Promise.reject({ message: "User not found" })];
                        return [2 /*return*/, this.userRepository.remove(userToRemove)];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
