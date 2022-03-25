const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// extends off Sequelize's Model class
class Dashboard extends Model { }

// fields and rules for Blogs model
Dashboard.init(

    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        dashboardContent: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true
    }
);

module.exports = Dashboard; 