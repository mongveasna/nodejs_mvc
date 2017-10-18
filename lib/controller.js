const fs = require("fs");
const controllerDir = fs.readdirSync("controller");
const controllers = {};
// Export all controller
module.exports = controllers;
for (const ctr of controllerDir) {
    if (fs.lstatSync("controller/" + ctr).isDirectory()) {
        const subCtrs = fs.readdirSync("controller/" + ctr);
        for (const subCtr of subCtrs) {
            if (subCtr.endsWith(".js")) {
                controllers[subCtr.replace(".js", "")] = require("../controller/" + ctr + "/" + subCtr);
            }
        }
    } else if (ctr.endsWith(".js")) {
        controllers[ctr.replace(".js", "")] = require("../controller/" + ctr);
    }
}
