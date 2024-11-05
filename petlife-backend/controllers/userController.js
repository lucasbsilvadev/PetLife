const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createUser = async (req, res) => {
    console.log('Requisição de cadastro recebida:', req.body); 
    const { username, email, password } = req.body; 

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email e password são obrigatórios.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword }); 
        res.status(201).json(newUser);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Nome de usuário ou email já estão em uso.' }); 
        }
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Username e password são obrigatórios.' });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Obtém o ID do usuário do token
        const user = await User.findByPk(userId, { attributes: ['id', 'username', 'email'] }); // Atualiza para incluir email

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.json(user); // Retorna os dados do usuário
    } catch (error) {
        console.error('Erro ao obter perfil do usuário:', error);
        res.status(500).json({ error: 'Erro ao obter perfil do usuário.' });
    }
};

module.exports = {
    createUser,
    loginUser,
    getProfile
};
