const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// extends off Sequelize's Model class
class Comment extends Model { }

// fields and rules for Blog model
Comment.init(

    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

        comments: {
            type: DataTypes.STRING,
            allowNull: false
        },

        user_id: {
            type: DataTypes.INTEGER,

            references: {
                model: 'user',
                key: 'id',
                unique: false
            }
        },
        blog_id: {
            type: DataTypes.INTEGER,

            references: {
                model: 'blog',
                key: 'id',
                unique: false
            }

        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Comment'
    }
);

module.exports = Comment; 