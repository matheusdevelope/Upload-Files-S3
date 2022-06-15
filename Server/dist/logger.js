"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var pino = require("pino");
var pretty = require("pino-pretty");
var logger = pino(pretty({
    colorize: true,
}));
exports.logger = logger;
