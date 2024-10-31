import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/Profile.css'; // Importando os novos estilos

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');

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
                await fetchAppointments(response.data.id); // Busca as consultas do usuário
            } catch (err) {
                setError('Erro ao carregar o perfil. Verifique se você está autenticado.');
            }
        };

        const fetchAppointments = async (userId) => {
            try {
                const response = await api.get(`/appointments`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setAppointments(response.data);
            } catch (err) {
                setError('Erro ao carregar as consultas agendadas.');
            }
        };

        fetchProfile();
    }, []);

    if (error) return <p>{error}</p>;
    if (!profileData) return <p>Carregando...</p>;

    return (
        <div className="profile-container">
            <h2>Perfil</h2>
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
                        </div>
                    ))
                ) : (
                    <p className="no-appointments">Nenhuma consulta agendada.</p>
                )}
            </div>

            <a className="botao" href="#marcar-consulta">Marcar Nova Consulta</a>
        </div>
    );
};

export default Profile;
