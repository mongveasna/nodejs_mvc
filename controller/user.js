
const models = CORE.MODEL;
const utils = CORE.UTILS;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let userCtr = {};
let field = {
    email: 'required|email',
    user_name: 'required|min:3',
    password: 'required|min:6',
    retype_password: 'required|same:password'
};

userCtr.onCreate = async function (ctx) {
    try {
        let body = ctx.request.body;
        let header = ctx.request.headers;
        let headerValidation = utils.validate(header, { device_uuid: 'required' }, ctx);
        if (headerValidation != null) {
            return ctx.fail(headerValidation);
        };
        let validation = utils.validate(ctx.request.body, field, ctx);
        if (validation != null) {
            return ctx.fail(validation);
        };
        // ==================== check exist user name =======
        let checkUsername = await models.user.checkUserName(body.user_name);
        if (checkUsername) {
            let Res = {};
            Res.username = "Username or password already exists.";
            return ctx.fail(Res);
        };
        // ====================== check exist ================
        let checkEmail = await models.user.checkUserEmail(body.email);
        if (checkEmail) {
            let Res = {};
            Res.email = "Username or password already exists.";
            return ctx.fail(Res);
        };

        let createdUser = await models.user.create({
            user_name: body.user_name,
            role_id: 1,
            password: utils.hash(body.password),
            gender: body.gender,
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            created_date: new Date()
        });
        let resultUs = {};
        if (createdUser) {
            let tokenStr = createdUser.id + ':' + body.user_name + ':' + utils.uuidV4().replace(/-/g, "");
            let userAgent = ctx.userAgent;
            let createdUserToken = await models.user_token.create({
                user_id: createdUser.id,
                token: utils.hash(tokenStr),
                device_uuid: header.device_uuid,
                device_name: userAgent.platform,
                device_os: userAgent.os,
                device_version: userAgent.version,
                is_active: 1,
                created_date: new Date()
            });
            resultUs.token = createdUserToken.token;
            resultUs.firstName = createdUser.firstName ? createdUser.firstName : "";
            resultUs.lastLame = createdUser.lastName ? createdUser.lastName : "";
            resultUs.email = createdUser.email;
            let result = { data: resultUs, message: 'Succuss' };
            return ctx.success(result);
        } else {
            return ctx.fail('not found');
        }
    } catch (err) {
        return ctx.fail(err);
    }
};
function dbRelation() {
    models.user.hasOne(models.user_token, { foreignKey: 'user_id' });
    models.user_token.belongsTo(models.user, { foreignKey: 'user_id' });
}
userCtr.onLogin = async function (ctx) {
    try {
        // let hashedPassword = bcrypt.hashSync(ctx.body.password, 8);
        let token = jwt.sign({ email: '33', fullName: '3333', _id: 33333}, 'RESTFULAPIs');
        console.log(token);
        return ctx.success(token);
    } catch (err) {
        return ctx.fail(err.message);
    }
};
userCtr.testToken = async function (ctx) {
    return ctx.success(ctx.user);
}
userCtr.onRead = async function(ctx){
    // let seq = models.sequelize.Op;
    // console.log(seq);
    // let existUserTokent = await models.user_token.find({
    //     attributes: ['id', 'token'],
    //     where: {
    //         [seq.and]:{
    //             id:7
    //         }
    //     }
    // });
    // console.log(existUserTokent);
    console.log(ctx.auth_header.user);
    let res = {};
    res.message = 'auth success';
    return ctx.success(res);
};
module.exports = userCtr;