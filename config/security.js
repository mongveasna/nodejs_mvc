module.exports = {
    request_limit: 0,
    corsOptions: {
        "origin": "*", // change this to specific domain for security purpose
        "methods": [
            "GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"
        ],
        "preflightContinue": false,
        "allowedHeaders": [
            "origin", "content-type", "accept", "authorization", "Accept-Language"
        ],
        "maxAge": 1000,
        "Access-Control-Allow-Credentials": false
    }
};