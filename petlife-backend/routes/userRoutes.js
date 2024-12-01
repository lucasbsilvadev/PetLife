const express = require('express');
const { createUser, loginUser, getProfile } = require('../controllers/userController');
const { authenticateToken, authenticateAdmin } = require('../middlewares/auth'); 
const User = require('../models/User');

const router = express.Router();

router.post('/register', createUser); 
router.post('/login', loginUser); 

// Proteger a rota para pegar dados do usuário
router.get('/profile', authenticateToken, getProfile); 

// Rota exclusiva para administradores


module.exports = router;
