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
    isAdmin: { // Novo campo para controlar privilégios
        type: Sequelize.TINYINT,  // Usado como booleano
        defaultValue: 0, // 0 = Usuário comum, 1 = Administrador
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
