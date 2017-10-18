module.exports = {
    host: "127.0.0.1",
    port: "5432",
    database: "test",
    username: "postgres",
    password: "superme",
    dialect: 'postgres',
    logging: true,
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