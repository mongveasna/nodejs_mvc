module.exports = (sequelize, DataTypes) => {
    return sequelize.define('roles', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
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