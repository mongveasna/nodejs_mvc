const fs = require("fs");
const env = process.env.NODE_ENV || 'development';
const path = require("path");

const configs = fs.readdirSync(path.resolve("config"));

for (const config of configs) {
    if (fs.lstatSync(path.resolve("config", config)).isDirectory()) {
        const configDir = fs.readdirSync(path.resolve("config", config));
        for (const subConfig of configDir) {
            if (subConfig.endsWith(".js")) {
                exports[subConfig.replace(/.js/g, "")] = require(`../config/${env}/${subConfig}`);
            }
        }
    }
    else if (config.endsWith(".js")) {
        exports[config.replace(/.js/g, "")] = require(`../config/${config}`);
    }
}