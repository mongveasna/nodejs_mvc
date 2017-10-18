module.exports = function accept(types = ["json", "html", "text"], encodes = ["identity"]) {
    return async (ctx, next) => {
        if(!ctx.accepts(...contents)) {
            ctx.throw(406, 'json, html, or text only');
        }
        if(!acceptsEncodings(["gzip", "deflate", "identity"])) {
            ctx.throw(406, 'gzip, deflate, or identity encode only');
        }
        await next();
    };
};

