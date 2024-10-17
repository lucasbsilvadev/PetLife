const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sincronização do banco de dados
sequelize.sync()
    .then(() => {
        console.log('Tabelas criadas');
    })
    .catch(err => {
        console.error('Erro ao criar tabelas:', err);
    });

// Usando as rotas
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
