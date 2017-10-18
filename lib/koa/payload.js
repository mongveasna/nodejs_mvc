module.exports = function payload() {
    return async (ctx, next) => {
        ctx.payload = ctx.request.body;
        await next();
    };
};

