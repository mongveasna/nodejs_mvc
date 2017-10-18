const node_redis = require("redis");
const {
    redis
} = require("./config");
module.exports = {
    driver: node_redis,
    createClient(){ return node_redis.createClient(redis.port, redis.host, redis.optioin)},
    redisPub(){ return node_redis.createClient(redis.port, redis.host, redis.optioin)},
    redisSub(){ return node_redis.createClient(redis.port, redis.host, redis.optioin)},
    redisClient(){ return node_redis.createClient(redis.port, redis.host, redis.optioin)}
};