import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <Shield size={32} />
            <span>CrimeReport</span>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/report" onClick={() => setIsMenuOpen(false)}>Report Crime</Link>
            <Link to="/track" onClick={() => setIsMenuOpen(false)}>Track Report</Link>
            <Link to="/emergency" onClick={() => setIsMenuOpen(false)}>
              <Phone size={16} />
              Emergency
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <button className="btn-logout" onClick={handleLogout}>
                  Logout ({user.name})
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </nav>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;