const http = require("http");

module.exports = error;

async function onCatch(ctx, err, opts) {
    let type = ctx.request.headers.accept ? ctx.accepts('json', 'html', 'text') : false;
    if(!type) type = ctx.is('html');
    if(!type) type = ctx.is('text');
    if(!type) type = ctx.is('json');
    
    switch (type) {
        case 'text':
            ctx.type = 'text/plain';
            if(ctx.status >= 400 && ctx.status <= 499) {
                ctx.body = err.message;
            } else {
                if (opts.env === 'development') ctx.body = err.message + "\n\n" + err.stack;
                else if (err.expose) ctx.body = err.message;
                else throw err;
            }
            break;
        case 'html':
            ctx.type = 'text/html';
            ctx.body = await ctx.render(opts.template || "error", {
                cache: opts.cache,
                env: opts.env,
                ctx: ctx,
                request: ctx.request,
                response: ctx.response,
                error: err.message,
                stack: err.stack,
                status: ctx.status,
                code: err.code
            });
            break;
        case 'json':
            ctx.type = 'application/json';
            if(ctx.status >= 400 && ctx.status <= 499) {
                ctx.body = { error: true, message: err.message };
            } else {
                if (opts.env === 'development') ctx.body = { error: true, message: err.message, data: err.stack };
                else if (err.expose) ctx.body = { error: true, message: err.message };
                else ctx.body = { error: true, message: http.STATUS_CODES[ctx.status] };
            }
            break;
    }
}

function error(opts = {}) {
    opts.env = process.env.NODE_ENV || 'development';
    if (opts.cache == null || opts.cache == undefined) opts.cache = (opts.env !== 'development');
    
    return async function error(ctx, next) {
        try {
            await next();
            if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404);
        } catch (err) {
            ctx.status = typeof err.status === 'number' ? err.status : (err.constructor.name === "AssertionError" ? 400 : 500);
            console.log("<><><><><><><>", ctx.status);
            ctx.app.emit('error', err, ctx);
            onCatch(ctx, err, opts);
        }
    }
}
