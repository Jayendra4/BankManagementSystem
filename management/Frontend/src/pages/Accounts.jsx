import React, { useState, useEffect } from 'react';
import { accountAPI } from '../services/api';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [formData, setFormData] = useState({
    accountHolder: '',
    balance: 0,
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await accountAPI.getAllAccounts();
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAccount) {
        await accountAPI.updateAccount(editingAccount._id, formData);
      } else {
        await accountAPI.createAccount({
          ...formData,
          accountNumber: `ACC${Date.now()}`
        });
      }
      fetchAccounts();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving account:', error);
    }
  };

  const handleEdit = (account) => {
    setEditingAccount(account);
    setFormData({
      accountHolder: account.accountHolder,
      balance: account.balance,
      email: account.email,
      phone: account.phone
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await accountAPI.deleteAccount(id);
        fetchAccounts();
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      accountHolder: '',
      balance: 0,
      email: '',
      phone: ''
    });
    setEditingAccount(null);
  };

  const filteredAccounts = accounts.filter(account =>
    account.accountHolder.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const styles = {
    container: {
      padding: '32px',
      maxWidth: '1200px',
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
    headerActions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      gap: '16px'
    },
    searchContainer: {
      position: 'relative',
      flex: 1,
      maxWidth: '400px'
    },
    searchIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#a0aec0',
      fontSize: '16px'
    },
    searchInput: {
      width: '100%',
      padding: '12px 16px 12px 44px',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.2s',
      backgroundColor: '#f7fafc'
    },
    addButton: {
      padding: '12px 24px',
      backgroundColor: '#4299e1',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 1px 3px rgba(66, 153, 225, 0.3)'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '24px'
    },
    accountCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
      border: '1px solid #f7fafc',
      transition: 'all 0.2s',
      position: 'relative'
    },
    accountCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)'
    },
    accountHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px'
    },
    accountInfo: {
      flex: 1
    },
    accountNumber: {
      fontSize: '12px',
      color: '#718096',
      fontWeight: '500',
      marginBottom: '4px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    accountName: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1a202c',
      marginBottom: '4px'
    },
    accountEmail: {
      fontSize: '14px',
      color: '#718096'
    },
    accountBalance: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '16px'
    },
    accountActions: {
      display: 'flex',
      gap: '8px'
    },
    actionButton: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    editButton: {
      backgroundColor: '#edf2f7',
      color: '#4a5568'
    },
    deleteButton: {
      backgroundColor: '#fed7d7',
      color: '#c53030'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '16px'
    },
    modalContent: {
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      width: '100%',
      maxWidth: '500px',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    modalTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1a202c',
      marginBottom: '24px'
    },
    formGroup: {
      marginBottom: '20px'
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
      outline: 'none',
      transition: 'all 0.2s',
      backgroundColor: '#f7fafc'
    },
    formInputFocus: {
      borderColor: '#4299e1',
      backgroundColor: 'white'
    },
    modalButtons: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      marginTop: '32px'
    },
    cancelButton: {
      padding: '12px 24px',
      backgroundColor: '#edf2f7',
      color: '#4a5568',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    saveButton: {
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
    emptyState: {
      textAlign: 'center',
      padding: '64px 32px',
      color: '#718096'
    },
    emptyStateIcon: {
      fontSize: '48px',
      marginBottom: '16px',
      opacity: '0.5'
    },
    emptyStateText: {
      fontSize: '18px',
      fontWeight: '500',
      marginBottom: '8px'
    },
    emptyStateSubtext: {
      fontSize: '14px',
      color: '#a0aec0'
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Accounts</h1>
        <p style={styles.subtitle}>Manage all bank accounts and their information</p>
      </div>

      <div style={styles.headerActions}>
        <div style={styles.searchContainer}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <button
          style={styles.addButton}
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <span>+</span>
          Add Account
        </button>
      </div>

      {filteredAccounts.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyStateIcon}>📊</div>
          <div style={styles.emptyStateText}>No accounts found</div>
          <div style={styles.emptyStateSubtext}>
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first account to get started'}
          </div>
        </div>
      ) : (
        <div style={styles.gridContainer}>
          {filteredAccounts.map((account) => (
            <div key={account._id} style={styles.accountCard}>
              <div style={styles.accountHeader}>
                <div style={styles.accountInfo}>
                  <div style={styles.accountNumber}>{account.accountNumber}</div>
                  <div style={styles.accountName}>{account.accountHolder}</div>
                  <div style={styles.accountEmail}>{account.email}</div>
                </div>
              </div>
              <div style={styles.accountBalance}>
                ${account.balance.toLocaleString()}
              </div>
              <div style={styles.accountActions}>
                <button
                  style={{ ...styles.actionButton, ...styles.editButton }}
                  onClick={() => handleEdit(account)}
                >
                  ✏️ Edit
                </button>
                <button
                  style={{ ...styles.actionButton, ...styles.deleteButton }}
                  onClick={() => handleDelete(account._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>
              {editingAccount ? 'Edit Account' : 'Add New Account'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Account Holder</label>
                <input
                  type="text"
                  style={styles.formInput}
                  value={formData.accountHolder}
                  onChange={(e) => setFormData({...formData, accountHolder: e.target.value})}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Balance</label>
                <input
                  type="number"
                  step="0.01"
                  style={styles.formInput}
                  value={formData.balance}
                  onChange={(e) => setFormData({...formData, balance: parseFloat(e.target.value)})}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Email</label>
                <input
                  type="email"
                  style={styles.formInput}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Phone</label>
                <input
                  type="text"
                  style={styles.formInput}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
              <div style={styles.modalButtons}>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={styles.saveButton}
                >
                  {editingAccount ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;
