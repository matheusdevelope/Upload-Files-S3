"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = __importStar(require("jsonwebtoken"));
var configs_1 = __importDefault(require("./configs"));
var UserController_1 = require("./database/controller/UserController");
var handler_logs_1 = require("./handler_logs");
function Middleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        function Send401(message) {
            (0, handler_logs_1.NewLog)({
                requester: req.body.requester || "system",
                type: "middleware",
                sector: "middleware",
                data: { message: message, req: req.body },
            }).finally(function () {
                return res.status(401).send({ error: message });
            });
            return;
        }
        var User, authHeader, parts, scheme, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ///exclude this routes from check of token
                    if (req.originalUrl === "/help" || req.originalUrl === "/api/manager/login")
                        return [2 /*return*/, next()];
                    if (!(req.originalUrl === "/up_file_ftp")) return [3 /*break*/, 2];
                    if (req.method === "GET")
                        return [2 /*return*/, next()];
                    if (!req.body.requester)
                        return [2 /*return*/, Send401("Requester not provided")]; // res.status(401).send({ message: "Requester not provided" });
                    return [4 /*yield*/, new UserController_1.UserController().Auth(req.body.requester)];
                case 1:
                    User = _a.sent();
                    if (!User)
                        return [2 /*return*/, Send401("The user don't have register to access API")];
                    // res
                    //   .status(401)
                    //   .send({ message: "The user don't have register to access API" });
                    if (!User.allow_access)
                        return [2 /*return*/, Send401("The user cannot access resources of API")];
                    // res
                    //   .status(401)
                    //   .send({ message: "The user cannot access resources of API" });
                    return [2 /*return*/, next()];
                case 2:
                    authHeader = req.headers.authorization;
                    if (!authHeader)
                        return [2 /*return*/, Send401("No Token Provided")]; //res.status(401).send({ error: "No Token Provided" });
                    parts = authHeader.split(" ");
                    if (!(parts.length === 2))
                        return [2 /*return*/, Send401("Token Error")]; // res.status(401).send({ error: "Token Error" });
                    scheme = parts[0], token = parts[1];
                    if (!/Bearer/i.test(scheme))
                        return [2 /*return*/, Send401("Token malformatted")]; // res.status(401).send({ error: "Token malformatted" });
                    jwt.verify(token, configs_1.default.SECRET_JWT, function (err, decoded) {
                        if (err)
                            return Send401("Invalid Token"); //res.status(401).send({ error: "Invalid Token" });
                        //req.userId = decoded.id;
                        return next();
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = Middleware;
