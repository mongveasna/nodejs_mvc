const fs = require("fs");
const env = process.env.NODE_ENV || 'development';


// load file in configuration folder
const configs = fs.readdirSync("config");
for (const config of configs) {
    if(fs.statSync("config/" + config).isFile() && config.endsWith(".js")) {
        const setting = require("../config/" + config);
        const envConfig = `config/${env}/${config}`;
      
        if(fs.existsSync(envConfig)) {
            Object.assign(setting, require("../" + envConfig));
        }
        exports[config.replace(/.js/g, "")] = setting;
    }
}