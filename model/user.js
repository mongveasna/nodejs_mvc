module.exports = (sequelize, DataTypes) => {
    let users = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(250),
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_log_in_date: {
            type: DataTypes.DATE,
            allowNull: true

        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: true
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gender_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        maritail_status_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        address: {
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

        }
    });
    users.checkUserName = async function (userName) {
        return await users.findOne({
            where: {
                user_name: userName
            }
        });
    };
    users.checkUserEmail = async function (email) {
        return await users.findOne({
            where: {
                email: email
            }
        });
    };
    return users;
};