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
exports.LogController = void 0;
var data_source_1 = require("../data-source");
var uuid_1 = require("uuid");
var Log_1 = require("../entity/Log");
var typeorm_1 = require("typeorm");
var LogController = /** @class */ (function () {
    function LogController() {
        this.logRepository = data_source_1.AppDataSource.getRepository(Log_1.Log);
    }
    LogController.prototype.all_no_pagination = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.logRepository.find()];
            });
        });
    };
    LogController.prototype.all = function (req, response, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var take, skip, keyword, _e, result, total, e_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        take = Number((_a = req.body) === null || _a === void 0 ? void 0 : _a.take) === 0 ? 50 : Math.floor(Number((_b = req.body) === null || _b === void 0 ? void 0 : _b.take));
                        skip = Math.floor(Number((_c = req.body) === null || _c === void 0 ? void 0 : _c.skip)) || 0;
                        keyword = ((_d = req.body) === null || _d === void 0 ? void 0 : _d.keyword) || '';
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.logRepository.findAndCount({
                                where: { data: (0, typeorm_1.Like)('%' + keyword + '%') }, order: { created_at: "DESC" },
                                take: take,
                                skip: skip
                            })];
                    case 2:
                        _e = _f.sent(), result = _e[0], total = _e[1];
                        return [2 /*return*/, Promise.resolve({
                                data: result,
                                count: total
                            })];
                    case 3:
                        e_1 = _f.sent();
                        Promise.reject({ error: e_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LogController.prototype.one = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var log;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.logRepository.find({
                            where: {
                                created_at: date
                            },
                        })];
                    case 1:
                        log = _a.sent();
                        if (!log)
                            return [2 /*return*/, Promise.reject({ message: "log not found" })];
                        return [2 /*return*/, Promise.resolve(log)];
                }
            });
        });
    };
    LogController.prototype.save = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    body.id = (0, uuid_1.v4)();
                    body.created_at = new Date();
                    return [2 /*return*/, this.logRepository.save(body)];
                }
                catch (e) {
                    return [2 /*return*/, Promise.reject(e)];
                }
                return [2 /*return*/];
            });
        });
    };
    LogController.prototype.saveLog = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                body = req.body;
                try {
                    body.id = (0, uuid_1.v4)();
                    body.created_at = new Date();
                    return [2 /*return*/, this.logRepository.save(body)];
                }
                catch (e) {
                    return [2 /*return*/, Promise.reject(e)];
                }
                return [2 /*return*/];
            });
        });
    };
    LogController.prototype.remove = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var logToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.logRepository.findOneBy({
                            id: request.params.id,
                        })];
                    case 1:
                        logToRemove = _a.sent();
                        if (!logToRemove)
                            return [2 /*return*/, Promise.reject({ message: "Log not found" })];
                        return [2 /*return*/, this.logRepository.remove(logToRemove)];
                }
            });
        });
    };
    LogController.prototype.removeAll = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.logRepository.clear()];
            });
        });
    };
    return LogController;
}());
exports.LogController = LogController;
