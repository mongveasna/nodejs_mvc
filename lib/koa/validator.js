const http = require('http');
const Validator = require("validatorjs");

module.exports = function validate() {
    return async (ctx, next) => {
        ctx.validate = (rules, data) => new Validator(data, rules);
        await next();
    };
};

