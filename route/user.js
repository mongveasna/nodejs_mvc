module.exports = {
    prefix: "/user",
    routes: [
        {
            before: ['Auth@loginRequired'],
            handler: "user@testToken",
            path: "/test",
            method: "POST"
        }
    ]
}