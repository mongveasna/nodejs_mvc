module.exports = {
    before:["test@test"],
    routes: [{
            handler: "home@landing",
            path: "/home",
            method: "get"
        } 
    ]
}