module.exports = {
    host: "127.0.0.1",
    port: "3306",
    database: "",
    username: "",
    password: "",
    dialect: 'mysql',

    pool: {
        max: 100,
        min: 1,
        idle: 10000
    },
    define: {
        underscored: true,
        freezeTableName: true
    },
    operatorsAliases: false
};