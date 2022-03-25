const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// extends off Sequelize's Model class
class Blog extends Model { }

// fields and rules for Blog model
Blog.init(

    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,

        },

        blogContent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        blog_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
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
        modelName: 'blog'
    }
);

module.exports = Blog; 