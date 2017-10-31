const models = CORE.MODEL;
const utils = CORE.UTILS;
let Auth = {};

Auth.onAuthAccessToken = async function (ctx) {
        let headerValidation = utils.validate(ctx.request.headers, { access_token: 'required' }, ctx);
        if (headerValidation != null) {
            throw new Error('access_token require');
        }
        let data_auth_header = await sessionAccessToken(ctx);
        ctx.auth_header = data_auth_header;
};
let sessionAccessToken = async function (ctx) {
    let res = {};
    let accessToken = await getAccessToken(ctx);
    let userAgent = ctx.userAgent;
    let device_name = userAgent.platform;
    let device_os = userAgent.os;
    let device_version = userAgent.version;
    let device_uuid = ctx.request.headers.device_uuid;
    let uUnquiId = "";
    let headerValidation = utils.validate(ctx.request.headers, { device_uuid: 'required' }, ctx);
    if (headerValidation != null) {
        throw new Error('device_uuid require');
    }
    if(accessToken == null){
        throw new Error('access_token is invalid.');
    }
    if (device_uuid) {
        uUnquiId = device_uuid;
    }
    let header_json = {
        device_uuid: uUnquiId,
        device_name: userAgent.platform,
        device_os: userAgent.os,
        device_version: userAgent.version
    };
    
    let is_tokens = await models.user_token.findOne({
        attributes: ['user_id','token', 'device_uuid', 'device_name', 'device_os', 'device_version'],
        where: {
            token: accessToken,
            device_uuid: uUnquiId,
            device_name: userAgent.platform,
            device_os: userAgent.os,
            device_version: userAgent.version
        }
    });
    if (is_tokens == null) {
        throw new Error('Invalid Token. Please log in again.');
    }
    let user = await models.user.findOne({
        attributes:['id','user_name','role_id','gender','firstName','lastName','email'],
        where: {
            id: is_tokens.user_id
        }
    });
    if (user == null) {
        throw new Error('User not found');
    }
    header_json.user = user;
    return header_json;
};
let getAccessToken = async function(ctx) {
    let token = ctx.request.headers.access_token;
    if (token) {
        let array = token.split(" ");
        if (array.length > 0) {
            return array[1];
        }
    }
    return null;
};
module.exports = Auth;