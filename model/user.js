module.exports = (sequelize, DataTypes) => {
    let users = sequelize.define('users', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(250),
        }
      
    });
    return users;
};