#!/bin/bash
const cls = require('continuation-local-storage');
require('dotenv').config();

const core = {};
global.CORE = core;

const domain = require("domain");
const fs = require("fs");
let models = require("./lib/model");
const utils = require("./lib/utils.js");
core.UTILS = utils;
const logger = require("./lib/logger")("index");
// Load all model
core.MODEL = models;
let contorllers = require("./lib/controller");
// Load all controllers
core.CONTROLLER = contorllers;
// init configuration
core.CONFIG =  require("./lib/config");
// Load all filter
core.BEFORE = require("./lib/before");
global.LOGGER = logger;
const {
    app: appConfig
} = core.CONFIG;
core.HELPER =  require("./lib/helper");
if (appConfig.redis) {
    core.REDIS = require("./lib/redis");
}
const app = require("./lib/koa");
// run every request handler inside a domain controller
const handler = function (req, res, app) {
    const d = domain.create();
    d.on("error", function (err) {
        logger.error("error" + err.message);
        logger.debug("error" + err.stack);
        try {
            res.statusCode = 500;
            res.setHeader("content-type", "text/plain");
            res.end("Oops, there was a problem!\n");
        } catch (er2) {
            // oh well, not much we can do at this point.
            logger.debug("Error sending 500! " + er2.stack);
        }
    });
    d.add(req);
    d.add(res);
    d.add(app);

    // Now run the handler function in the domain.
    d.run(function () {
        app(req, res);
    });
};

let server = null;

if (appConfig.ssl) {
    const https = require("https");
    const privateKey = fs.readFileSync(appConfig.ssl.key, "utf8");
    const certificate = fs.readFileSync(appConfig.ssl.cert, "utf8");

    const credentials = {
        key: privateKey,
        cert: certificate
    };
    server = https.createServer(credentials, function (req, res) {
        handler(req, res, app.callback());
    });
} else {
    const http = require("http");
    server = http.createServer((req, res) => handler(req, res, app.callback()));
}

// Starting socket
if (appConfig.socket && appConfig.redis) {
    core.SocketManager = require('./lib/socket.js')(server, core.CONTROLLER); // load socket lib
}

// Starting web server
server.listen(appConfig.port || 8080, function () {
    logger.info("Server started and listening on port " + (appConfig.port || 8080));
});

process.on("uncaughtException", function (err) {
    logger.info("UncaughtException:" + err.message);
    logger.error("Application crashed!!! Stack trace:\n" + err.stack);
    process.exit(1);
});

module.exports = server;