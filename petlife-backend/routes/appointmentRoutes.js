const express = require('express');
const { createAppointment, getAppointments, updateAppointment, deleteAppointment } = require('../controllers/AppointmentController');
const authenticateToken = require('../middlewares/auth'); 
const router = express.Router();

// Rota para agendar consulta
router.post('/', authenticateToken, createAppointment);

router.get('/', authenticateToken, getAppointments);

router.put('/:id', authenticateToken, updateAppointment);

router.delete('/:id', authenticateToken, deleteAppointment);

module.exports = router;
