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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var data_source_1 = require("./database/data-source");
var routes_1 = require("./routes");
var configs_1 = __importDefault(require("./configs"));
var middleware_1 = __importDefault(require("./middleware"));
var ManagerController_1 = require("./database/controller/ManagerController");
var path_1 = require("path");
var logger_1 = require("./logger");
var handler_logs_1 = require("./handler_logs");
var PORT = configs_1.default.TEST_PORT ? configs_1.default.TEST_PORT : configs_1.default.PORT || 3000;
data_source_1.AppDataSource.initialize()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = express();
                app.use(bodyParser.json());
                app.use(cors());
                app.use(express.static((0, path_1.resolve)(__dirname, "..", "dist", "client")));
                app.get("/", function (req, res) {
                    res.sendFile((0, path_1.resolve)(__dirname, "..", "dist", "client", "index.html"));
                });
                app.use(middleware_1.default);
                // register express routes from defined application routes
                routes_1.Routes.forEach(function (route) {
                    app[route.method](route.route, function (req, res, next) {
                        try {
                            var result_1 = new route.controller()[route.action](req, res, next);
                            if (result_1 instanceof Promise) {
                                result_1
                                    .then(function (result) {
                                    result !== null && result !== undefined
                                        ? res.send(result)
                                        : undefined;
                                })
                                    .catch(function (e) {
                                    console.log(e);
                                    res.status(400).json(e);
                                });
                            }
                            else if (result_1 instanceof Error) {
                                (0, handler_logs_1.NewLog)({
                                    requester: "system",
                                    type: "error",
                                    sector: "INDEX - Error Result",
                                    data: JSON.stringify(result_1),
                                }, "error").finally(function () {
                                    res
                                        .status(500)
                                        .json({ error: result_1, message: "Algo Deu Errado" });
                                });
                            }
                            else if (result_1 !== null && result_1 !== undefined) {
                                (0, handler_logs_1.NewLog)({
                                    requester: "system",
                                    type: "error",
                                    sector: "INDEX - Error Result 2",
                                    data: JSON.stringify(result_1),
                                }, "error").finally(function () {
                                    res.status(500).json(result_1);
                                });
                            }
                        }
                        catch (e) {
                            (0, handler_logs_1.NewLog)({
                                requester: "system",
                                type: "error",
                                sector: "INDEX - Error On Request",
                                data: JSON.stringify(e),
                            }, "error").finally(function () {
                                res.status(500).json({ error: e, message: "Algo Deu Errado" });
                            });
                        }
                    });
                });
                return [4 /*yield*/, new ManagerController_1.ManagerController().FirstManager()];
            case 1:
                _a.sent();
                app.listen(PORT, function () {
                    logger_1.logger.info("Express server has started on port ".concat(PORT, ". Open  http://localhost:").concat(PORT, "/ to see results"));
                });
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (error) { return logger_1.logger.error(error); });
