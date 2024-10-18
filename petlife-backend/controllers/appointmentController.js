const Appointment = require('../models/Appointment');

// Criar novo agendamento
const createAppointment = async (req, res) => {
    const userId = req.user.id;
    const { pet_name, species, breed, age, weight, reason, date, time } = req.body;
  
    // Verificar se todos os campos necessários estão preenchidos
    if (!pet_name || !species || !age || !weight || !reason || !date || !time) {
      return res.status(400).json({ error: 'Todos os campos devem ser preenchidos.' });
    }
  
    try {
      const appointment = await Appointment.create({
        pet_name,
        species,
        breed,
        age,
        weight,
        reason,
        date,
        time,
        userId,
      });
      res.status(201).json(appointment);
    } catch (err) {
      console.error('Erro ao agendar consulta:', err); 
      res.status(500).json({ error: 'Erro ao agendar consulta', message: err.message });
    }
  };

// Listar todos os agendamentos
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ where: { userId: req.user.id } });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar consultas', message: err.message });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
};
