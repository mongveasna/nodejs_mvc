
const models = CORE.MODEL;
const utils = CORE.UTILS;
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
        let body = ctx.request.body;
        let header = ctx.request.headers;
        let headerValidation = utils.validate(header, { device_uuid: 'required' }, ctx);
        if (headerValidation != null) {
            return ctx.fail(headerValidation);
        };
        let validation = utils.validate(ctx.request.body, {
            user_name: 'required',
            password: 'required'
        }, ctx);
        if (validation != null) {
            return ctx.fail(validation);
        };

        let users = await models.user.findOne({
            attributes: ['id', 'email', 'user_name', 'firstName', 'lastName'],
            where: {
                user_name: body.user_name,
                password: utils.hash(body.password)
            },
            includes: [{
                model: models.user_token,
                attributes: ['id', 'token']
            }]
        });
        if (users) {
            await models.user.update({
                last_log_in_date: new Date()
            }, {
                    where: {
                        id: users.id
                    }
                });
            let userAgent = ctx.userAgent;
            //=== find if client already has token ===
            let existUserTokent = await models.user_token.findOne({
                attributes: ['id', 'token'],
                where: {
                    user_id: users.id,
                    device_uuid: header.device_uuid,
                    device_name: userAgent.platform,
                    device_os: userAgent.os,
                    device_version: userAgent.version
                }
            });
            let resultUs = {};
            //== if the same client, system will return old token==
            if (existUserTokent) {
                resultUs.id = users.id;
                resultUs.token = users.user_token ? users.user_token.token : "";
                resultUs.firstName = users.firstName ? users.firstName : "";
                resultUs.lastLame = users.lastName ? users.lastName : "";
                resultUs.email = users.email;
            } else {
                //== if different client, system will generate new token ==
                let tokenStr = users.id + ':' + body.user_name + ':' + utils.uuidV4().replace(/-/g, "");
                let createdUserToken = await models.user_token.create({
                    user_id: users.id,
                    token: utils.hash(tokenStr),
                    device_uuid: header.device_uuid,
                    device_name: userAgent.platform,
                    device_os: userAgent.os,
                    device_version: userAgent.version,
                    is_active: 1,
                    created_date: new Date()
                });
                resultUs.id = users.id;
                resultUs.token = createdUserToken ? createdUserToken.token : "";
                resultUs.firstName = users.firstName ? users.firstName : "";
                resultUs.lastLame = users.lastName ? users.lastName : "";
                resultUs.email = users.email;
            }
            let result = { data: resultUs, message: 'You loggin Successfull' };
            return ctx.success(result);
        } else {
            let result = { message: 'Incorrect user name or password.' };
            return ctx.fail(result);
        }
    } catch (err) {
        return ctx.fail(err);
    }
};
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