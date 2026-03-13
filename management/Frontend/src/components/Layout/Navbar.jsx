import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);

  const styles = {
    navbar: {
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '0 24px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    menuButton: {
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    logo: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f2937'
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    iconButton: {
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '6px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    notificationBadge: {
      position: 'absolute',
      top: '6px',
      right: '6px',
      width: '8px',
      height: '8px',
      backgroundColor: '#ef4444',
      borderRadius: '50%'
    },
    profileSection: {
      position: 'relative'
    },
    profileButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
      borderRadius: '6px'
    },
    profileAvatar: {
      width: '32px',
      height: '32px',
      backgroundColor: '#3b82f6',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '14px'
    },
    profileName: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#1f2937'
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      right: '0',
      marginTop: '8px',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      minWidth: '200px',
      zIndex: 20
    },
    dropdownItem: {
      padding: '12px 16px',
      fontSize: '14px',
      color: '#374151',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      width: '100%',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    dropdownDivider: {
      height: '1px',
      backgroundColor: '#e5e7eb',
      margin: '4px 0'
    }
  };

  return (
    <nav style={styles.navbar}>
      {/* Left Section */}
      <div style={styles.leftSection}>
        <button
          style={styles.menuButton}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <div style={styles.logo}>🏦 BankSystem</div>
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button style={styles.iconButton}>
            🔔
            <span style={styles.notificationBadge}></span>
          </button>
        </div>

        {/* Profile Dropdown */}
        <div style={styles.profileSection}>
          <button
            style={styles.profileButton}
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <div style={styles.profileAvatar}>
              {user?.accountHolder?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span style={styles.profileName}>{user?.accountHolder || 'User'}</span>
            ▼
          </button>
          
          {showProfileDropdown && (
            <div style={styles.dropdown}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ fontWeight: '500', color: '#1f2937' }}>{user?.accountHolder}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{user?.email}</div>
              </div>
              <button style={styles.dropdownItem}>
                ⚙️ Settings
              </button>
              <div style={styles.dropdownDivider}></div>
              <button style={styles.dropdownItem} onClick={logout}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
