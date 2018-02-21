const userSocket = {};
module.exports = userSocket;
userSocket.initSocket = async function (context) {
    const socket = context.socket;
    const chanel = context.chanel;
    const redisClient = CORE.redis.createClient();
    socket.emit("connected");
    redisClient.on("message", function (chanel, msg) {
        socket.emit("message", msg);
    });

    redisClient.on('error', function (error) {
        console.log(error);
    });
    console.log(chanel);
    redisClient.subscribe(chanel);
}