const { Sequelize } = require('sequelize'); // Importando Sequelize
const sequelize = require('../config/db'); // Ajuste o caminho conforme necessário

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Garante que o username seja único
    },
    email: { // Novo campo para email
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Garante que o email seja único
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
