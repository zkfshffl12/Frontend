import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Intune Front' }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          <h1>{title}</h1>
          {isAuthenticated && user && (
            <div className="user-info">
              <span>Welcome, {user.name}!</span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          )}
        </div>
        {isAuthenticated && (
          <nav className="layout-nav">
            <Link to="/chat/list">Chat List</Link>
            <Link to="/user/match">Find Match</Link>
          </nav>
        )}
      </header>
      <main className="layout-main">
        {children}
      </main>
      <footer className="layout-footer">
        <p>&copy; 2024 Intune Front. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout; 