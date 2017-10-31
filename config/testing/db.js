module.exports = {
    host: "127.0.0.1",
    port: "3306",
    database: "test",
    username: "=",
    password: "",
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 100,
        min: 1,
        idle: 10000
    },
    define: {
        underscored: true,
        freezeTableName: true
    }
};