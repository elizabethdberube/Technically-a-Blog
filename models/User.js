const { Model, Datatypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkUserPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
}

User.init({

    id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Datatypes.STRING,
        allowNull: false,

    },

    email: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
            len: [6],
        },
    },
},
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserDate.password, 10);
                return newUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscorder: true,
    }
);

module.exports = User;
