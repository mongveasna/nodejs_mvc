
const model = CORE.model;
const util = CORE.util;
const bcrypt = require('bcryptjs');
let userCtr = {};

userCtr.onLogin = async (ctx) => {
    try {
        // let hashedPassword = bcrypt.hashSync(ctx.body.password, 8);
        let token = jwt.sign({ email: '33', fullName: '3333', _id: 33333}, 'RESTFULAPIs');
        console.log(token);
        return ctx.success(token);
    } catch (err) {
        return ctx.fail(err.message);
    }
};
userCtr.testToken = async (ctx) => {
    try{     
        let user = await model.user.findOne();    
        // let data = await CORE.firebaseDb().ref('terms_and_conditions/auam').once('value').then({});
        ctx.success(user);   
    }catch(error){
        ctx.fail(error.message, 500)
    }
}
module.exports = userCtr;