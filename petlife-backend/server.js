const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

sequelize.sync()
  .then(() => console.log('Tabelas criadas com sucesso!'))
  .catch(err => console.error('Erro ao sincronizar tabelas:', err));

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);


app.get('/', (req, res) => res.send('API rodando!'));

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
