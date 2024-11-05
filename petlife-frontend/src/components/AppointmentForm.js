import React, { useState } from 'react';
import api from '../services/api';
import '../styles/AppointmentForm.css';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    pet_name: '',
    species: '',
    breed: '',
    age: '',
    weight: '',
    reason: '',
    date: '',
    time: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Dados enviados:', formData); 
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/appointments', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ type: 'success', text: 'Consulta agendada com sucesso!' });
    } catch (err) {
      console.error('Erro ao agendar consulta:', err);
      if (err.response) {
        setMessage({ type: 'error', text: err.response.data.error || 'Erro desconhecido. Tente novamente.' });
      } else {
        setMessage({ type: 'error', text: 'Erro ao agendar consulta. Tente novamente mais tarde.' });
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Agende uma Consulta</h2>
      {message.text && <p className={message.type === 'error' ? 'form-error' : 'form-success'}>{message.text}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="pet_name"
          placeholder="Nome do Pet"
          value={formData.pet_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="species"
          placeholder="Espécie"
          value={formData.species}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="breed"
          placeholder="Raça"
          value={formData.breed}
          onChange={handleChange}
        />
        <input
          type="text"
          name="reason"
          placeholder="Motivo da Consulta"
          value={formData.reason}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Idade do Pet"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="Peso (kg)"
          value={formData.weight}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
       <select
  name="time"
  value={formData.time}
  onChange={handleChange}
  required
>
  <option value="">Selecione um horário</option>
  <option value="10:00">10:00 - 11:00</option>
  <option value="11:00">11:00 - 12:00</option>
  <option value="13:00">13:00 - 14:00</option>
  <option value="14:00">14:00 - 15:00</option>
  <option value="15:00">15:00 - 16:00</option>
  <option value="16:00">16:00 - 17:00</option>
</select>
        <button type="submit" className="botao">Agendar</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
