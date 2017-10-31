const crypto = require("crypto");
const validator = require("validatorjs");
const _ = require("underscore");
const jwt = require('jsonwebtoken');
const uuid = require("node-uuid");


let utils = {};
/**
 * get uuid V4
 * @return {String}
 * @api public
 */
utils.uuidV4 = function(ctx) {
    return uuid.v4.apply(ctx, arguments).replace(/-/g, "");
};

utils.hash = function(data, options) {
    options = options || {
        algorithms: "sha256",
        encoding: "base64"
    };
    var hash = crypto.createHash(options.algorithms);
    return hash.update(data).digest(options.encoding);
};

utils.validate = function (body, option, ctx) {
    let res = {};
    try {
        let validate = new validator(body, option, {});
        if (validate.fails()) {
            var filteredIds = _.filter(_.keys(option), function (key) {
                let error = validate.errors.first(key);
                if (error) {
                    res[key] = error;
                }
                // console.log(res);
            });
            
            // return ctx.success(res);
            return res;
        }else{
            return null;
        }
    } catch (err) {
        return ctx.fail(res, res.message = err.message);
    }
}
utils.sisSecretOrKey = 'jdkjkfjnmfjfhjd';
utils.generateToken = function(req){
    // let token = generateToken(ctx.request);
    // console.log(token);
    // var decoded = jwt.verify(token, 'jdjfhnlloiujeyyehdnxxmjdjdh');
    // console.log(decoded.userName) ;
    var token = jwt.sign({
      userName:  req.body.user_name
    },utils.sisSecretOrKey);  // secret is defined in the environment variable JWT_SECRET
    return token;
  };
module.exports = utils;