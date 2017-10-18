const Winston = require("winston");
const { log: logConfig } = require("./config");

Winston.configure(logConfig);

// log level: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
class Logger {
    constructor(prefix) {
        this.prefix = prefix;
    }

    error(msg, ...extra) {
        Winston.log("error", this.prefix + " : " + msg, extra);
    }
    warn(msg, ...extra) {
        Winston.log("warn", this.prefix + " : " + msg, extra);
    }
    info(msg, ...extra) {
        Winston.log("info", this.prefix + " : " + msg, extra);
    }
    verbose(msg, ...extra) {
        Winston.log("verbose", this.prefix + " : " + msg, extra);
    }
    debug(msg, ...extra) {
        Winston.log("debug", this.prefix + " : " + msg, extra);
    }
    silly(msg, ...extra) {
        Winston.log("silly", this.prefix + " : " + msg, extra);
    }
}

module.exports = function(prefix = "") {
    return new Logger(prefix);
};