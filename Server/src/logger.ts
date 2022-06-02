const pino = require("pino");
const pretty = require("pino-pretty");
const logger = pino(
  pretty({
    colorize: true,
  })
);

export { logger };
