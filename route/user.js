module.exports = {
    prefix: "/user",
    routes: [
        {
            before: "Auth@onAuthAccessToken",
            handler: "user@onRead",
            path: "/read",
            method: "POST"
        },
        {
            handler: "user@onCreate",
            path: "/create",
            method: "POST"
        },
        {
            handler: "user@onLogin",
            path: "/login",
            method: "POST"
        }
    ]
}