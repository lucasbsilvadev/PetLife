import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated, isAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false); 
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to={isAuthenticated ? "/inicio" : "/"}>Início</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li><Link to="/AdminDashboard">Admin</Link></li>
            <li><Link to="/profile">Perfil</Link></li>
            <li><Link to="/clinica">Clínica</Link></li>
            <li><Link to="/farmacia">Farmácia</Link></li>
            <li><Link to="/duvidas">Dúvidas</Link></li>
            <li><button onClick={handleLogout}>Finalizar Sessão</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registrar</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
