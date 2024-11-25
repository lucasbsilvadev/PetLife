const { Sequelize } = require('sequelize'); 
const sequelize = require('../config/db'); 

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, 
    },
    email: { 
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, 
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
});

module.exports = User; 
