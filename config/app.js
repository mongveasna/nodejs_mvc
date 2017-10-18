module.exports = {
    host: "*",
    port: 8080,
    ssl: null,
    viewCache: false,
    dbsync: false,
    encryptionKey: "99",
    sessionSecret: "22",
    jwtSecret: "33",
    socket: true,
    redis: true,
    compress: {
        filter: (content_type) => {
            return /text/i.test(content_type);
        },
        threshold: 2048,
        flush: require("zlib").Z_SYNC_FLUSH
    }
};