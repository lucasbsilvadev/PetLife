import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Auth.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users/register', { email, username, password });
            navigate('/login'); 
        } catch (err) {
            setError('Erro ao registrar usuário. Por favor, tente novamente.');
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Registrar</h2>
            {error && <p className="auth-error">{error}</p>}
            <form className="auth-form" onSubmit={handleRegister}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="auth-input"
                />
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Usuário"
                    required
                    className="auth-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    required
                    className="auth-input"
                />
                <button type="submit" className="botao">Registrar</button>
            </form>
        </div>
    );
};

export default Register;
