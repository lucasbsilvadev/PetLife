const express = require('express');
const { createAppointment, getAppointments, updateAppointment, deleteAppointment, getAllAppointments } = require('../controllers/appointmentController');
const { authenticateToken, authenticateAdmin } = require('../middlewares/auth'); 

const router = express.Router();

// Rota para criar uma consulta
router.post('/', authenticateToken, createAppointment);

// Rota para pegar consultas específicas do usuário
router.get('/get', authenticateToken, getAppointments);

// Rota para editar uma consulta
router.put('/:id', authenticateToken, updateAppointment);

// Rota para deletar uma consulta
router.delete('/:id', authenticateToken, deleteAppointment);

// Rota para pegar todas as consultas (somente administradores)
router.get('/all', authenticateToken, authenticateAdmin, getAllAppointments);

module.exports = router;
