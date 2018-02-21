const fs = require("fs");
const env = process.env.NODE_ENV || 'development';
const path = require("path");
// load file in configuration folder
// const configs = fs.readdirSync("config");
// for (const config of configs) {
//     if(fs.statSync("config/" + config).isFile() && config.endsWith(".js")) {
//         const setting = require("../config/" + config);
//         const envConfig = `config/${env}/${config}`;
      
//         if(fs.existsSync(envConfig)) {
//             Object.assign(setting, require("../" + envConfig));
//         }
//         exports[config.replace(/.js/g, "")] = setting;
//     }
// }

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