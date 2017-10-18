const fs = require("fs");
const beforeDir = fs.readdirSync("before");
const befores = {};
// Export all controller
module.exports = befores;
for (const before of beforeDir) {
    if (fs.lstatSync("before/" + before).isDirectory()) {
        const subBefores = fs.readdirSync("before/" + before);
        for (const subBefore of subBefores) {
            if (subBefore.endsWith(".js")) {
                befores[subBefore.replace(".js", "")] = require("../before/" + before + "/" + subBefore);
            }
        }
    } else if (before.endsWith(".js")) {
        befores[before.replace(".js", "")] = require("../before/" + before);
    }
}
