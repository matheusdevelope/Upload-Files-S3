"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var configs_1 = __importDefault(require("../configs"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    //url: Config.DB_URL,
    // port: Config.DB_PORT,
    // host: Config.DB_HOST,
    // username: Config.DB_USER,
    // password: Config.DB_PASS,
    database: configs_1.default.DB_NAME || "",
    //ssl: true,
    synchronize: true,
    logging: false,
    entities: [__dirname + "/entity/**/*.{js,ts}"],
    migrations: [__dirname + "/migration/**/*.{js,ts}"],
    subscribers: [],
});
//'mysql://hvngfbnqfk2s:************@fm5gfblk33ym.us-east-2.psdb.cloud/whatsapi?ssl={"rejectUnauthorized":true}'
