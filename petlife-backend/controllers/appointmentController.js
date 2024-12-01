const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { Op } = require('sequelize');

const createAppointment = async (req, res) => {
  const userId = req.user.id;
  const { pet_name, species, breed, age, weight, reason, date, time } = req.body;

  if (!pet_name || !species || !age || !weight || !reason || !date || !time) {
    return res.status(400).json({ error: 'Todos os campos devem ser preenchidos.' });
  }

  try {
    // Verificar se a data e hora são no passado
    const appointmentDateTime = new Date(`${date}T${time}:00Z`);
    const currentDateTime = new Date();

    if (appointmentDateTime <= currentDateTime) {
      return res.status(400).json({ error: 'A data e hora do agendamento não podem estar no passado.' });
    }

    // Verificar se o horário solicitado está no intervalo de almoço (12h - 13h)
    const requestedTime = new Date(`1970-01-01T${time}:00Z`);
    const lunchStart = new Date('1970-01-01T12:00:00Z');
    const lunchEnd = new Date('1970-01-01T13:00:00Z');
    const openingTime = new Date('1970-01-01T08:00:00Z');
    const closingTime = new Date('1970-01-01T17:00:00Z');

    // Verificar horário de funcionamento
    if (requestedTime < openingTime || requestedTime > closingTime) {
      return res.status(400).json({ error: 'O horário de agendamento deve ser entre 08h e 17h.' });
    }

    if (requestedTime >= lunchStart && requestedTime < lunchEnd) {
      return res.status(400).json({ error: 'Não é possível agendar consultas no horário de almoço (12h - 13h).' });
    }

    // Verificar se o horário já está ocupado
    const existingAppointment = await Appointment.findOne({
      where: {
        date,
        time,
      },
    });

    if (existingAppointment) {
      return res.status(400).json({ error: 'Horário indisponível. Já existe uma consulta agendada neste horário.' });
    }

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



// Rota para obter consultas do usuário logado
const getAppointments = async (req, res) => {
  try {
      // Filtrar consultas pelo usuário logado
      const appointments = await Appointment.findAll({ where: { userId: req.user.id } });

      if (!appointments || appointments.length === 0) {
          return res.status(404).json({ message: 'Nenhuma consulta encontrada para este usuário.' });
      }

      res.json(appointments);
  } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar consultas.', error: err.message });
  }
};

const updateAppointment = async (req, res) => {
  const { id } = req.params; // Obter ID da consulta da URL
  const { pet_name, species, breed, age, weight, reason, date, time } = req.body;

  try {
    const appointment = await Appointment.findOne({ where: { id, userId: req.user.id } });
    if (!appointment) {
      return res.status(404).json({ error: 'Consulta não encontrada.' });
    }

    await appointment.update({
      pet_name,
      species,
      breed,
      age,
      weight,
      reason,
      date,
      time,
    });

    res.status(200).json(appointment);
  } catch (err) {
    console.error('Erro ao atualizar consulta:', err);
    res.status(500).json({ error: 'Erro ao atualizar consulta', message: err.message });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params; // Obter ID da consulta da URL

  console.log(`Tentando excluir consulta com ID: ${id} do usuário: ${req.user.id}`);

  try {
    const appointment = await Appointment.findOne({ where: { id, userId: req.user.id } });
    if (!appointment) {
      return res.status(404).json({ error: 'Consulta não encontrada.' });
    }

    await appointment.destroy();
    res.status(204).send(); // 204 No Content
  } catch (err) {
    console.error('Erro ao excluir consulta:', err);
    res.status(500).json({ error: 'Erro ao excluir consulta', message: err.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
      if (!req.user.isAdmin) {
          return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem visualizar todas as consultas.' });
      }

      const appointments = await Appointment.findAll({
          include: [{ model: User, as: 'User', attributes: ['id', 'username', 'email'] }], // Alterado 'name' para 'username'
      });

      res.status(200).json(appointments);
  } catch (err) {
      console.error('Erro ao buscar consultas:', err);
      res.status(500).json({ error: 'Erro ao buscar consultas', message: err.message });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getAllAppointments,
};
