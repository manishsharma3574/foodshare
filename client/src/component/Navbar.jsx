import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFoodShare } from '../context/FoodShareContext';

const Navbar = () => {
  const { currentUser, openAuthForRole, logoutUser } = useFoodShare();
  const location = useLocation();
  const navigate = useNavigate();

  const handleRestroClick = () => {
    if (currentUser.role === 'restaurant') {
      navigate('/restaurant-dashboard');
    } else {
      openAuthForRole('restaurant', 'login');
    }
  };

  const handleNgoClick = () => {
    if (currentUser.role === 'ngo') {
      navigate('/ngo-dashboard');
    } else {
      openAuthForRole('ngo', 'login');
    }
  };

  const handleAdminClick = () => {
    if (currentUser.role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      openAuthForRole('admin', 'login');
    }
  };

  return (
    <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '68px', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', textDecoration: 'none' }}>
          Food<span style={{ color: '#059669' }}>Share</span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: location.pathname === '/' ? '#059669' : '#334155', fontWeight: location.pathname === '/' ? 700 : 600 }}>
            Home
          </Link>
          <button onClick={handleRestroClick} style={{ background: 'none', border: 'none', color: location.pathname === '/restaurant-dashboard' ? '#059669' : '#334155', fontWeight: location.pathname === '/restaurant-dashboard' ? 700 : 600 }}>
            Restaurants
          </button>
          <button onClick={handleNgoClick} style={{ background: 'none', border: 'none', color: location.pathname === '/ngo-dashboard' ? '#d97706' : '#334155', fontWeight: location.pathname === '/ngo-dashboard' ? 700 : 600 }}>
            NGOs
          </button>
          <button onClick={handleAdminClick} style={{ background: 'none', border: 'none', color: location.pathname === '/admin-dashboard' ? '#2563eb' : '#334155', fontWeight: location.pathname === '/admin-dashboard' ? 700 : 600 }}>
            Admin
          </button>
          <Link to="/about" style={{ color: location.pathname === '/about' ? '#059669' : '#334155', fontWeight: location.pathname === '/about' ? 700 : 600 }}>
            About
          </Link>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {currentUser.role === 'guest' ? (
            <button onClick={() => openAuthForRole('restaurant', 'login')} className="btn-primary btn-sm">
              Login
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>{currentUser.name}</span>
              <button onClick={logoutUser} className="btn-secondary btn-sm">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;