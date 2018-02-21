const http = require('http');
const Validator = require("validatorjs");

module.exports = function validate() {
    return async (ctx, next) => {
        ctx.success = (data, statusCode = 200, options, message = "success", status = 200) => { 
            ctx.status = status; ctx.body = {data: data,message: message, options: options, code: statusCode};
        };
        ctx.fail = (data = {}, statusCode = 400, options, message = "fail", status) => { 
            status = typeof status === 'number' ? status: 400;
            ctx.status = status; 
            ctx.body = {data:data, statusCode:statusCode, message: message, options: options}; 
        };
        ctx.error = (data = {}, statusCode = 400, options, message = "fail", status) => {
            status = typeof status === 'number' ? status: 500;
            ctx.status = status; 
            ctx.body = {data:data, statusCode:statusCode, message: message, options: options}; 
        };
        await next();
    };
};

