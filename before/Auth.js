
let Auth = {};
const logger = require("../lib/logger")("koa");
const model = CORE.model;
Auth.loginRequired = async function (ctx) {
    // ASSERT(0, 999,403);
    // console.log(user.dataValues);
    // ctx.success(user.dataValues);
    // ASSERT(ctx.user,"Invalid Token", 500);
};

module.exports = Auth;