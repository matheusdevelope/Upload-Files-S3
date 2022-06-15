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
exports.Migration1654201476848 = void 0;
var Migration1654201476848 = /** @class */ (function () {
    function Migration1654201476848() {
        this.name = 'Migration1654201476848';
    }
    Migration1654201476848.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE `log` (`id` varchar(255) NOT NULL, `requester` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, `sector` varchar(255) NOT NULL, `data` varchar(8000) NOT NULL, `created_at` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE `user` (`id` varchar(255) NOT NULL, `cnpj` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `expiration_files` int NOT NULL, `allow_access` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE `ftp` (`id` int NOT NULL AUTO_INCREMENT, `host` varchar(255) NOT NULL, `user` varchar(255) NOT NULL, `pass` varchar(255) NOT NULL, `port` int NOT NULL, `path` varchar(255) NOT NULL, `deleteFiles` tinyint NOT NULL, `order` int NOT NULL, `userIdId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE `manager` (`id` varchar(255) NOT NULL, `user` varchar(255) NOT NULL, `pass` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `access` int NOT NULL, UNIQUE INDEX `IDX_f7fb87203a06eecfb00c90a894` (`user`), PRIMARY KEY (`id`)) ENGINE=InnoDB")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `ftp` ADD CONSTRAINT `FK_174ead810b520f514f8823e2de5` FOREIGN KEY (`userIdId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION")];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Migration1654201476848.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE `ftp` DROP FOREIGN KEY `FK_174ead810b520f514f8823e2de5`")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX `IDX_f7fb87203a06eecfb00c90a894` ON `manager`")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE `manager`")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE `ftp`")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE `user`")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE `log`")];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Migration1654201476848;
}());
exports.Migration1654201476848 = Migration1654201476848;
