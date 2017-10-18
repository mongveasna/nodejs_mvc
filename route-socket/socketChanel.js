module.exports = {
    routes: [{
            handler: "socket@admin",
            path: "/admin",
        },
        {
            handler: "socket@sale",
            path: "/sale"
        },
        {
            handler: "socket@sale",
            path: "/san"
        }
    ]
}