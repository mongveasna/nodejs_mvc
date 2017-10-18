const app = require("../index");
const request = require('supertest');
const common = require("../lib/common");
const logger = require("../lib/logger")("test/register");

const {
    AuthToken,
    Wallet,
    Auth,
    AuthSecurity,
    Profile,
    NumberRange
} = require("../lib/model");

describe("Register new customer account", function () {
    it("successfully register", function (done) {
        request(app)
            .post('/api/auth/register/customer')
            .send({
                "email": "eanglay@hotmail.com",
                "username": "eanglay",
                "firstname": "eang",
                "lastname": "lay",
                "password": common.sha512("12345678")
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res, body) {
                logger.debug("response body: ", body);
                if (err) throw err;
                done();
            });
    });
});