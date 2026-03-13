import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.accountHolder || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Simulate API call for profile update
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Profile updated successfully!');
      
      // Update user context (in real app, this would come from API)
      // updateUser({ ...user, accountHolder: profileData.name, email: profileData.email });
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (profileData.newPassword !== profileData.confirmPassword) {
      setMessage('New passwords do not match');
      setLoading(false);
      return;
    }

    if (profileData.newPassword.length < 6) {
      setMessage('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call for password update
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Password updated successfully!');
      setProfileData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      setMessage('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: '32px',
      maxWidth: '1000px',
      margin: '0 auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      marginBottom: '32px'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#1a202c',
      marginBottom: '8px',
      letterSpacing: '-0.5px'
    },
    subtitle: {
      fontSize: '16px',
      color: '#718096',
      marginBottom: '32px'
    },
    tabsContainer: {
      display: 'flex',
      gap: '8px',
      marginBottom: '32px',
      borderBottom: '1px solid #e2e8f0'
    },
    tab: {
      padding: '12px 24px',
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: '2px solid transparent',
      fontSize: '14px',
      fontWeight: '500',
      color: '#718096',
      cursor: 'pointer',
      transition: 'all 0.2s',
      marginBottom: '-1px'
    },
    activeTab: {
      color: '#4299e1',
      borderBottomColor: '#4299e1'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
      border: '1px solid #f7fafc'
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1a202c',
      marginBottom: '24px'
    },
    formGroup: {
      marginBottom: '24px'
    },
    formLabel: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#4a5568'
    },
    formInput: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '14px',
      backgroundColor: '#f7fafc',
      outline: 'none',
      transition: 'all 0.2s'
    },
    formInputFocus: {
      borderColor: '#4299e1',
      backgroundColor: 'white'
    },
    button: {
      padding: '12px 24px',
      backgroundColor: '#4299e1',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    buttonDisabled: {
      backgroundColor: '#a0aec0',
      cursor: 'not-allowed'
    },
    message: {
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '20px',
      fontSize: '14px',
      fontWeight: '500'
    },
    successMessage: {
      backgroundColor: '#d1fae5',
      color: '#065f46',
      border: '1px solid #a7f3d0'
    },
    errorMessage: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #fecaca'
    },
    dangerZone: {
      marginTop: '32px',
      padding: '24px',
      backgroundColor: '#fff5f5',
      border: '1px solid #fed7d7',
      borderRadius: '12px'
    },
    dangerZoneTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#c53030',
      marginBottom: '8px'
    },
    dangerZoneText: {
      fontSize: '14px',
      color: '#742a2a',
      marginBottom: '16px'
    },
    dangerButton: {
      padding: '8px 16px',
      backgroundColor: '#e53e3e',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    preferencesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px'
    },
    preferenceItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      backgroundColor: '#f7fafc',
      borderRadius: '8px'
    },
    preferenceLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#1a202c'
    },
    preferenceDescription: {
      fontSize: '12px',
      color: '#718096',
      marginTop: '4px'
    },
    toggle: {
      position: 'relative',
      width: '48px',
      height: '24px',
      backgroundColor: '#cbd5e0',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    toggleActive: {
      backgroundColor: '#4299e1'
    },
    toggleSlider: {
      position: 'absolute',
      top: '2px',
      left: '2px',
      width: '20px',
      height: '20px',
      backgroundColor: 'white',
      borderRadius: '50%',
      transition: 'transform 0.2s'
    },
    toggleSliderActive: {
      transform: 'translateX(24px)'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Settings</h1>
        <p style={styles.subtitle}>Manage your account settings and preferences</p>
      </div>

      <div style={styles.tabsContainer}>
        <button
          style={{ ...styles.tab, ...(activeTab === 'profile' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('profile')}
        >
          👤 Profile
        </button>
        <button
          style={{ ...styles.tab, ...(activeTab === 'security' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('security')}
        >
          🔒 Security
        </button>
        <button
          style={{ ...styles.tab, ...(activeTab === 'preferences' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('preferences')}
        >
          ⚙️ Preferences
        </button>
      </div>

      {activeTab === 'profile' && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Profile Information</h2>
          
          {message && (
            <div style={{
              ...styles.message,
              ...(message.includes('successful') ? styles.successMessage : styles.errorMessage)
            }}>
              {message}
            </div>
          )}

          <form onSubmit={handleProfileUpdate}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Full Name</label>
              <input
                type="text"
                style={styles.formInput}
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Email Address</label>
              <input
                type="email"
                style={styles.formInput}
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Account Number</label>
              <input
                type="text"
                style={{ ...styles.formInput, backgroundColor: '#edf2f7' }}
                value={user?.accountNumber || 'N/A'}
                disabled
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {})
              }}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'security' && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Change Password</h2>
          
          {message && (
            <div style={{
              ...styles.message,
              ...(message.includes('successful') ? styles.successMessage : styles.errorMessage)
            }}>
              {message}
            </div>
          )}

          <form onSubmit={handlePasswordUpdate}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Current Password</label>
              <input
                type="password"
                style={styles.formInput}
                value={profileData.currentPassword}
                onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>New Password</label>
              <input
                type="password"
                style={styles.formInput}
                value={profileData.newPassword}
                onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                required
                minLength="6"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Confirm New Password</label>
              <input
                type="password"
                style={styles.formInput}
                value={profileData.confirmPassword}
                onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {})
              }}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>

          <div style={styles.dangerZone}>
            <h3 style={styles.dangerZoneTitle}>Danger Zone</h3>
            <p style={styles.dangerZoneText}>
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button style={styles.dangerButton}>
              Delete Account
            </button>
          </div>
        </div>
      )}

      {activeTab === 'preferences' && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Preferences</h2>
          
          <div style={styles.preferencesGrid}>
            <div style={styles.preferenceItem}>
              <div>
                <div style={styles.preferenceLabel}>Email Notifications</div>
                <div style={styles.preferenceDescription}>
                  Receive email updates about your account activity
                </div>
              </div>
              <div style={styles.toggle}>
                <div style={styles.toggleSlider}></div>
              </div>
            </div>

            <div style={styles.preferenceItem}>
              <div>
                <div style={styles.preferenceLabel}>Two-Factor Authentication</div>
                <div style={styles.preferenceDescription}>
                  Add an extra layer of security to your account
                </div>
              </div>
              <div style={{ ...styles.toggle, ...styles.toggleActive }}>
                <div style={{ ...styles.toggleSlider, ...styles.toggleSliderActive }}></div>
              </div>
            </div>

            <div style={styles.preferenceItem}>
              <div>
                <div style={styles.preferenceLabel}>Dark Mode</div>
                <div style={styles.preferenceDescription}>
                  Use dark theme across the application
                </div>
              </div>
              <div style={styles.toggle}>
                <div style={styles.toggleSlider}></div>
              </div>
            </div>

            <div style={styles.preferenceItem}>
              <div>
                <div style={styles.preferenceLabel}>Auto-logout</div>
                <div style={styles.preferenceDescription}>
                  Automatically logout after 30 minutes of inactivity
                </div>
              </div>
              <div style={{ ...styles.toggle, ...styles.toggleActive }}>
                <div style={{ ...styles.toggleSlider, ...styles.toggleSliderActive }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
