const path = require("path");

const {
    app: appConfig,
    security: securityConfig,
    i18n: i18nConfig
} = require("./config");
const logger = require("./logger")("lib/koa");

// thirdparty koa lib
const Koa = require("koa");
const koaLogger = require("koa-logger");
const convert = require("koa-convert");
const serve = require("koa-static");
const hbs = require("koa-hbs");
const helmet = require("koa-helmet");
const bodyParser = require("koa-bodyparser");
const session = require("koa-generic-session");
const ratelimit = require("koa-ratelimit");
// custom koa libs
const koaError = require("./koa/error");
const validator = require("./koa/validator");
const payload = require("./koa/payload");
const transaction = require("./koa/transaction");
const response = require("./koa/response");
const locales = require("./koa/locales");
const UserAgent = require('koa-useragent');
const jsonwebtoken = require("jsonwebtoken");

const app = new Koa();

app.use(hbs.middleware({
    viewPath: path.resolve(__dirname, "../view"),
    disableCache: !appConfig.viewCache
}));

app.use(koaError());
app.use(validator());
app.use(koaLogger());
app.use(convert(session()));
app.use(helmet());
app.use(UserAgent);
locales(app, i18nConfig);

if(appConfig.compress){
    app.use(require("koa-compress")(appConfig.compress))
}

if(securityConfig.corsOptions){
    app.use(convert(require("koa-cors")(appConfig.corsOptions)));
}

if (securityConfig.request_limit) {
    const redisClient  = require("./redis").redisClient();
    app.use(ratelimit({
        db: redisClient, // SET A REDIS INSTANCE!
        duration: 60000,
        errorMessage: "Sometime we just need to slow down to enjoy the beauty of life.",
        id: (ctx) => ctx.ip,
        headers: {
            remaining: "Rate-Limit-Remaining",
            reset: "Rate-Limit-Reset",
            total: "Rate-Limit-Total"
        },
        max: 100
    }));
}

app.use(serve("public"));

app.use(bodyParser());
// app.use(payload());
// app.use(transaction({autocommit: false}));
app.use(response());

// END TODO LAST PART OF MIDDLEWARE DO NOT WRITE *****"app.use"***** BELOW THIS
// CALL!!!.
app.use(async(ctx, next) => {
    // we need to explicitly set 404 here so that koa doesn"t assign 200 on body=
    ctx.status = 404;
    switch (ctx.accepts("html", "json")) {
        case "html":
            ctx.type = "html";
            ctx.body = "<p>Page Not Found</p>";
            break;
        case "json":
            ctx.body = {
                message: "Page Not Found"
            };
            break;
        default:
            ctx.type = "text";
            ctx.body = "Page Not Found";
    }
    next();
});

app.use((ctx, next) => {
    console.log(ctx.headers);
    if (ctx.headers && ctx.headers.authorization && ctx.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(ctx.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) ctx.user = undefined;
            ctx.user = decode;
            next();
        });
    } else {
        ctx.user = undefined;
        next();
    }
});

module.exports = app;