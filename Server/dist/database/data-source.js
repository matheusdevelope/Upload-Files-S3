"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var path_1 = require("path");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: (0, path_1.resolve)(__dirname, "..", "..", "sqlite3", "database.sqlite"),
    synchronize: true,
    logging: false,
    entities: [__dirname + "/entity/**/*.{js,ts}"],
    migrations: [__dirname + "/migration/**/*.{js,ts}"],
    subscribers: [],
});
