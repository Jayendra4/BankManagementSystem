import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/accounts', icon: '💳', label: 'Accounts' },
    { path: '/transactions', icon: '💸', label: 'Transactions' },
    { path: '/customers', icon: '👥', label: 'Customers' },
    { path: '/reports', icon: '📈', label: 'Reports' },
    { path: '/settings', icon: '⚙️', label: 'Settings' },
  ];

  const styles = {
    sidebar: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: '256px',
      backgroundColor: 'white',
      borderRight: '1px solid #e5e7eb',
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s ease-in-out',
      zIndex: 30,
      display: 'flex',
      flexDirection: 'column'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: isOpen ? 'block' : 'none',
      zIndex: 25
    },
    logoSection: {
      padding: '24px',
      borderBottom: '1px solid #e5e7eb'
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    navSection: {
      flex: 1,
      padding: '16px 0'
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 24px',
      color: '#6b7280',
      textDecoration: 'none',
      transition: 'all 0.2s',
      border: 'none',
      background: 'none',
      width: '100%',
      textAlign: 'left',
      fontSize: '14px',
      cursor: 'pointer'
    },
    navItemActive: {
      backgroundColor: '#3b82f6',
      color: 'white',
      borderRight: '3px solid #3b82f6'
    },
    navItemHover: {
      backgroundColor: '#f3f4f6',
      color: '#1f2937'
    },
    navIcon: {
      fontSize: '20px',
      marginRight: '12px',
      width: '20px',
      textAlign: 'center'
    },
    logoutSection: {
      padding: '16px',
      borderTop: '1px solid #e5e7eb'
    },
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 24px',
      color: '#ef4444',
      textDecoration: 'none',
      transition: 'all 0.2s',
      border: 'none',
      background: 'none',
      width: '100%',
      textAlign: 'left',
      fontSize: '14px',
      cursor: 'pointer'
    },
    logoutButtonHover: {
      backgroundColor: '#fee2e2'
    },
    closeButton: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#6b7280',
      display: 'block'
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div style={styles.overlay} onClick={onClose} />
      
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <button
          style={styles.closeButton}
          onClick={onClose}
        >
          ×
        </button>
        
        <div style={styles.logoSection}>
          <div style={styles.logo}>
            🏦 BankSystem
          </div>
        </div>

        <nav style={styles.navSection}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  ...styles.navItem,
                  ...(isActive ? styles.navItemActive : {})
                }}
                onClick={onClose}
              >
                <span style={styles.navIcon}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={styles.logoutSection}>
          <button
            style={styles.logoutButton}
            onClick={logout}
          >
            <span style={styles.navIcon}>🚪</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
