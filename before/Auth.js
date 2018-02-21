
let Auth = {};
const logger = require("../lib/logger")("koa");
const assert = require("assert")

Auth.loginRequired = async function (ctx) {
    ASSERT(ctx.user,"Wrong value", 500);
};

module.exports = Auth;