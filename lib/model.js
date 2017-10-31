const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const bluebird = require("bluebird");
const {db: dbConfig, app: appConfig} = require("./config");
const logger = require("./logger")("lib/model");

const sequelize = new Sequelize(dbConfig);
const models = {};
let ready = false;

const modelDir = fs.readdirSync(path.resolve("model"));

for (const model of modelDir) {
    if (fs.lstatSync(path.resolve("model", model)).isDirectory()) {
        const subModelDir = fs.readdirSync(path.resolve("model", model));
        for (const subModel of subModelDir) {
            if (subModel.endsWith(".js")) {
                models[model][subModel.replace(/.js/g, "")] = sequelize.import (path.resolve("model", model, subModel)); 
            }
        }
    }
    else if (model.endsWith(".js") && model != "_relation.js") {
        models[model.replace(/.js/g, "")] = sequelize.import (path.resolve("model", model));
    }
}

models.sequelize = sequelize;
models.isReady = () => { return ready; };
module.exports = models;

async function syncDb() {
    if(dbConfig.dialect == "mysql") await sequelize.query("SET FOREIGN_KEY_CHECKS=0;");
    for (const i in models) {
        if(models[i] !== sequelize && models[i].sync)await models[i].sync(appConfig.dbsyncOpts);
    }
    if(dbConfig.dialect == "mysql") await sequelize.query("SET FOREIGN_KEY_CHECKS=1;");
    // require("../model/_relation")(models);
    ready = true;
}

if (appConfig.dbsync) syncDb();