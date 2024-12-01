const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido.' });
        }

        req.user = user;  // Atribui as informações do usuário no objeto `req`
        next();
    });
};

// Middleware para verificar se o usuário é administrador
const authenticateAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Acesso negado. Você não tem permissões de administrador.' });
    }
    next();
};

module.exports = { authenticateToken, authenticateAdmin };
