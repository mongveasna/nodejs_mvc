const userSocket = require("../lib/user-socket");
let domain = require('domain');

function domainRun(socket, socketChanel) {
    var d = domain.create();
    d.on('error', function (er) {
        log('error', er.stack);
    });
    d.add(socket);
    // Now run the handler function in the domain.
    d.run(async function () {
        await userSocket.initSocket({
            socket: socket,
            chanel: socketChanel
        });
    });
}

module.exports = {
    async admin(socket, chanel) {
        domainRun(socket, "admin");
    },
    sale(socket) {
        domainRun(socket, "sale");
    }
};