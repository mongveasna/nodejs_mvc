module.exports = {
    before: ["test@auth"],
    prefix: "",
    routes: [{
            before: ["Admin@amin", "Cal@cal"],
            handler: "home@landing",
            path: "/home",
            method: "GET"
        },
        {
            before: ["test@testHome", "test@testHome"],
            handler: "home@admin",
            path: "/admin",
            method: "GET"
        },
        {
            before: ["test@testHome", "test@testHome"],
            handler: "home@socket",
            path: "/socket",
            method: "GET"
        }
    ]
}