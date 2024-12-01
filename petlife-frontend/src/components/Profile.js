import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/Profile.css';
import { Link } from 'react-router-dom';


const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [editAppointment, setEditAppointment] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token não encontrado. Faça login novamente.');
                return;
            }

            try {
                const response = await api.get('/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfileData(response.data);
                await fetchAppointments(response.data.id);
                setSuccess('Perfil carregado com sucesso!');
            } catch (err) {
                setError('Erro ao carregar o perfil. Verifique se você está autenticado.');
            }
        };

        const fetchAppointments = async (userId) => {
            try {
                const response = await api.get(`/appointments/get`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setAppointments(response.data);
                if (response.data.length === 0) {
                    setSuccess('Nenhuma consulta agendada.');
                }
            } catch (err) {
                setError('Erro ao carregar as consultas agendadas.');
            }
        };

        fetchProfile();
    }, []);

    const handleDelete = async (appointmentId) => {
        try {
            const token = localStorage.getItem('token');
            await api.delete(`/appointments/${appointmentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
        const token = localStorage.getItem('token');

        try {
            const response = await api.put(`/appointments/${editAppointment.id}`, {
                pet_name: editAppointment.pet_name,
                reason: editAppointment.reason,
                date: editAppointment.date,
                time: editAppointment.time,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
        <div className="profile-container">
            <h2>Perfil</h2>
            {error && <p className="auth-error">{error}</p>}
            {success && <p className="auth-success">{success}</p>}
            {profileData ? (
                <>
                    <p className="profile-info">Bem-vindo, {profileData.username}!</p>
                    <p className="profile-info">Usuário: {profileData.username}</p>
                    <p className="profile-info">ID do Usuário: {profileData.id}</p>

                    <h3>Consultas Agendadas</h3>
                    <div className="appointments-list">
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <div key={appointment.id} className="appointment-item">
                                    <p><strong>Pet:</strong> {appointment.pet_name}</p>
                                    <p><strong>Data:</strong> {appointment.date} às {appointment.time}</p>
                                    <p><strong>Motivo:</strong> {appointment.reason}</p>
                                    <button className="botao" onClick={() => handleEdit(appointment)}>Editar</button>
                                    <button className="botao" onClick={() => handleDelete(appointment.id)}>Excluir</button>
                                </div>
                            ))
                        ) : (
                            <p className="no-appointments">Nenhuma consulta agendada.</p>
                        )}
                    </div>
                    <li><Link to="/clinica">   <a className="botao" href="#marcar-consulta">Marcar Nova Consulta</a> </Link></li>

                    {editAppointment && (
                        <form onSubmit={handleUpdate} className="edit-modal">
                            <h3>Editar Consulta</h3>
                            <input
                                type="text"
                                name="pet_name"
                                value={editAppointment.pet_name}
                                onChange={handleChange}
                                placeholder="Nome do Pet"
                                required
                            />
                            {/* Adicione os outros campos que você deseja editar */}
                            <input
                                type="text"
                                name="reason"
                                value={editAppointment.reason}
                                onChange={handleChange}
                                placeholder="Motivo"
                                required
                            />
                            <input
                                type="date"
                                name="date"
                                value={editAppointment.date}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="time"
                                name="time"
                                value={editAppointment.time}
                                onChange={handleChange}
                                required
                            />
                            <button type="submit">Salvar</button>
                            <button type="button" onClick={() => setEditAppointment(null)}>Cancelar</button>
                        </form>
                    )}
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default Profile;
