module.exports = (sequelize, DataTypes) => {
    return sequelize.define('purchase_amounts', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        min_amount: {
            type: DataTypes.DOUBLE(11, 4),
            allowNull: false
        },
        max_amount: {
            type: DataTypes.DOUBLE(11, 4),
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
           
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: true
           
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false
           
        },
        updated_date: {
            type: DataTypes.DATE,
            allowNull: false
           
        },
        updated_by: {
            type: DataTypes.INTEGER,
            allowNull: false
           
        },
    });
};