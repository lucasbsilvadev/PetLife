const express = require('express');
const { createUser, loginUser, getProfile } = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth'); // Importando o middleware
const User = require('../models/User');

const router = express.Router();

router.post('/register', createUser); // Cadastro de usuário
router.post('/login', loginUser); // Login de usuário

// Proteger essa rota para pegar dados do usuário
router.get('/profile', authenticateToken, getProfile); // Rota para obter perfil do usuário

module.exports = router;
