const http = require('http');
const Validator = require("validatorjs");

module.exports = function validate() {
    return async (ctx, next) => {
        ctx.success = (body = "success", status = 200) => { ctx.status = status; ctx.body = body; };
        ctx.fail = (body = "failed", status = 400) => { ctx.status = status; ctx.body = body; };
        ctx.err = (body = "error", status = 500) => { ctx.status = status; ctx.body = body; };
        await next();
    };
};

