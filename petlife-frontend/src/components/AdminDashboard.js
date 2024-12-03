import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [editAppointment, setEditAppointment] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem('token'); // Recupera o token do localStorage
                const response = await api.get('/appointments/all', {
                    headers: {
                        Authorization: `Bearer ${token}` // Passa o token no header
                    }
                });
                if (response.status === 200) {
                    setAppointments(response.data);
                } else {
                    setError('Erro ao buscar as consultas.');
                }
            } catch (err) {
                setError('Erro ao buscar as consultas.');
            }
        };

        fetchAppointments();
    }, []);

    const handleDelete = async (appointmentId) => {
        try {
            const token = localStorage.getItem('token'); // Recupera o token do localStorage
            await api.delete(`/appointments/${appointmentId}` {
                headers: {
                    Authorization: `Bearer ${token}` // Passa o token no header
                }
            });
            setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
            setSuccess('Consulta excluída com sucesso!');
        } catch (err) {
            setError('Erro ao excluir consulta.');
        }
    };

    const handleEdit = (appointment) => {
        setEditAppointment(appointment);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token'); // Recupera o token do localStorage
            const response = await api.put(`/appointments/${editAppointment.id}`, {
                pet_name: editAppointment.pet_name,
                species: editAppointment.species,
                breed: editAppointment.breed,
                age: editAppointment.age,
                weight: editAppointment.weight,
                reason: editAppointment.reason,
                date: editAppointment.date,
                time: editAppointment.time,
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Passa o token no header
                }
            });

            const updatedAppointments = appointments.map((appointment) =>
                appointment.id === response.data.id ? response.data : appointment
            );
            setAppointments(updatedAppointments);
            setSuccess('Consulta atualizada com sucesso!');
            setEditAppointment(null);
        } catch (err) {
            setError('Erro ao atualizar consulta.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditAppointment(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="admin-dashboard">
            <h2>Administrador</h2>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            {editAppointment && (
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        name="pet_name"
                        value={editAppointment.pet_name}
                        onChange={handleChange}
                    />
                    <button type="submit">Atualizar</button>
                </form>
            )}

            <table>
                <thead>
                    <tr>
                        <th>Pet</th>
                        <th>Espécie</th>
                        <th>Raça</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Usuário</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td>{appointment.pet_name}</td>
                            <td>{appointment.species}</td>
                            <td>{appointment.breed}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.User ? appointment.User.username : 'Desconhecido'}</td>
                            <td>
                                <button onClick={() => handleEdit(appointment)}>Editar</button>
                                <button onClick={() => handleDelete(appointment.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
