// Socket Connection


module.exports = exports = function (server, controllers) {
    const socketRoutes = require("../route-socket/socketChanel");
    const {
        redis
    } = require("./config");
    var io = require('socket.io')(server);
    var redis_io = require('socket.io-redis');
    io.adapter(redis_io(redis));
    //  fetch route chanel
    for (let socketRoute of socketRoutes.routes) {
        const socketPath = socketRoute.path;
        const handler = socketRoute.handler;
        io.of(socketPath).on("connection", function (socket) {
            const handlerArr = handler.split("@");
            if (handlerArr.length < 2) {
                socket.disconnect();
            }
            (async() => {
                try {
                    // Callcen soskcet handler
                    await controllers[handlerArr[0]][handlerArr[1]](socket);
                } catch (error) {
                    console.log(error);
                    socket.disconnect()
                }
            })();
        })
    }

    return io;
};