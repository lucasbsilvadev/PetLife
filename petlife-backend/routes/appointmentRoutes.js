const express = require('express');
const { createAppointment, getAppointments } = require('../controllers/AppointmentController');
const authenticateToken = require('../middlewares/auth'); // Verifica o token do usuário
const router = express.Router();

// Rota para agendar consulta
router.post('/', authenticateToken, createAppointment);

// Rota para listar todas as consultas
router.get('/', authenticateToken, getAppointments);

module.exports = router;
