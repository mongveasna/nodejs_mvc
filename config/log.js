const winston = require("winston");

module.exports = {
    level: "debug",
    transports: [
      new (winston.transports.Console)()
    ]
};