const logger = require("../lib/logger")("koa");
const fs = require("fs");
const Router = require('koa-router');

// TODO: dynamically load routing configurations
module.exports = function (app) {
    // Read all router file
    const routes = fs.readdirSync("route");
    // loop for mapping router
    for (let route of routes) {
        let routeObj = null;
        // Check if router is subdirectory
        if (fs.lstatSync("route/" + route).isDirectory()) {
            const subRoutes = fs.readdirSync("route/" + route);
            // Fetch router in directory
            for (const subRoute of subRoutes) {
                if (route.endsWith(".js")) {
                    // load router file by path
                    routeObj = require("../route/" + route + "/" + subRoute);
                }
            }
        } else if (route.endsWith(".js")) {
            // load router file by path
            routeObj = require("../route/" + route);
        }
        // get before route (Middleware)
        const befores = routeObj.before || [];
        // get all routes in one file
        const routes = routeObj.routes;
        const router = new Router({
            prefix: routeObj.prefix
        });
        for (const route of routes) {
            // console.log(route);
            const handler = route.handler.split("@");
            // get controller by controller object
            let controllerMethod = CORE.CONTROLLER[handler[0]][handler[1]];
            // if lenght < 2 invaild handler format then skip
            if (handler.length < 2 || (!controllerMethod)) {
                logger.warn(`Make sure you create ${handler[0]} file in controller folder and 
            declare method ${handler[1]}`);
                continue;
            }
            const beforeRoutes = befores.concat(route.before || []);
            const routeMethod = route.method.toLowerCase();
            router[routeMethod](route.path, async(ctx, next) => {
                try {
                    for (let before of beforeRoutes) {
                       let beforeArr = before.split("@");
                        // get before Method
                        const beforeMethod = CORE.BEFORE[beforeArr[0]][beforeArr[1]];
                        if (beforeArr.length < 2 || (!beforeMethod)) {
                            logger.warn(`Make sure you create ${beforeArr[0]} 
                        file in before folder and declare method ${beforeArr[1]} 
                        route path ${ routeObj.prefix + route.path}`);
                            continue;
                        }
                        await beforeMethod(ctx, next);
                    }
                    await next();
                } catch (error) {
                    let error_message = "";
                    if( typeof error.message  === 'object'){
                        error_message = JSON.stringify(error.message);
                    }else{
                        error_message = error.message;
                    }
                    let resultErr = {message:error_message};
                    ctx.fail(resultErr, error.code);
                }
            }, controllerMethod);
        }
        app.use(router.routes());
    }
}