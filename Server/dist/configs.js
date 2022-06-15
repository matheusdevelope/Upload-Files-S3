"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var Config = {
    DB_URL: process.env.DB_URL || "",
    DB_PORT: Number(process.env.DB_PORT),
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    PORT: Number(process.env.PORT) || 3000,
    SECRET_JWT: process.env.SECRET_JWT || "sdijfsfnklsdiorijjipeop",
    TEST_PORT: process.env.TEST_PORT,
};
exports.default = Config;
