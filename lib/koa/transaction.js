const logger = require("../logger")("lib/koa/transaction");

let {sequelize} = require("../model");

module.exports = function (opts) {
    return async function trans(ctx, next) {
        if (!ctx.__trans) 
            ctx.__trans = [];
        
        ctx.makeTrans = async() => {
            const t = await sequelize.transaction(opts);
            ctx
                .__trans
                .push(t);
            return t;
        };

        try {
            await next();
            if (ctx.__trans && ctx.__trans.length) {
                for (const t of ctx.__trans) {
                    await t.commit();
                }
            }
        } catch (err) {
            if (ctx.__trans && ctx.__trans.length) {
                for (const t of ctx.__trans) {
                    await t.rollback();
                }
            }
            throw err;
        }
    }
};