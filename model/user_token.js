module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_tokens', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        token:{
            type: DataTypes.STRING,
            allowNull: false
        },
        device_uuid: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: false
           
        },
        last_log_in_date: {
            type: DataTypes.DATE,
            allowNull: true
           
        },
        device_name: {
            type: DataTypes.STRING,
            allowNull: true
           
        },
        device_os: {
            type: DataTypes.STRING,
            allowNull: true
           
        },
        device_version: {
            type: DataTypes.STRING,
            allowNull: true
           
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: true
           
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true
           
        },
        updated_date: {
            type: DataTypes.DATE,
            allowNull: true
           
        },
        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: true
           
        },
    });
};