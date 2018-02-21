module.exports = {
    host: "*",
    port: 8080,
    ssl: null,
    viewCache: false,
    dbsync: false,
    encryptionKey: "idjf!G4542Y75xtwEAVo2m",
    sessionSecret: "22",
    jwtSecret: "94!93hG4542Y75xtwEAVo2m",
    socket: false,
    redis: false,
    compress: {
        filter: (content_type) => {
            return /text/i.test(content_type);
        },
        threshold: 2048,
        flush: require("zlib").Z_SYNC_FLUSH
    }
};