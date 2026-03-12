import React, { useState, useEffect } from 'react';
import { accountAPI } from '../services/api';

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [stats, setStats] = useState({
    totalAccounts: 0,
    totalBalance: 0,
    recentTransactions: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await accountAPI.getAllAccounts();
      const accountsData = response.data;
      
      setAccounts(accountsData.slice(0, 5)); // Show recent 5 accounts
      
      // Calculate stats
      const totalBalance = accountsData.reduce((sum, account) => sum + account.balance, 0);
      
      setStats({
        totalAccounts: accountsData.length,
        totalBalance: totalBalance,
        recentTransactions: Math.floor(Math.random() * 100) + 20, // Mock data
        activeUsers: accountsData.filter(acc => acc.balance > 0).length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: '24px'
    },
    header: {
      marginBottom: '32px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#6b7280'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    statCard: {
      background: 'white',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid #e5e7eb'
    },
    statHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    statTitle: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#6b7280'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginTop: '8px'
    },
    statIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px'
    },
    blueIcon: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    greenIcon: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    purpleIcon: {
      backgroundColor: '#8b5cf6',
      color: 'white'
    },
    orangeIcon: {
      backgroundColor: '#f59e0b',
      color: 'white'
    },
    changeContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '16px'
    },
    changeText: {
      fontSize: '14px',
      fontWeight: '500',
      marginLeft: '4px'
    },
    positiveChange: {
      color: '#10b981'
    },
    negativeChange: {
      color: '#ef4444'
    },
    changeLabel: {
      fontSize: '14px',
      color: '#6b7280',
      marginLeft: '8px'
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '24px'
    },
    card: {
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid #e5e7eb'
    },
    cardHeader: {
      padding: '24px',
      borderBottom: '1px solid #e5e7eb'
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937'
    },
    cardContent: {
      padding: '24px'
    },
    accountItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      marginBottom: '12px'
    },
    accountInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    accountAvatar: {
      width: '40px',
      height: '40px',
      backgroundColor: '#3b82f6',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '16px'
    },
    accountDetails: {
      flex: 1
    },
    accountName: {
      fontWeight: '500',
      color: '#1f2937',
      marginBottom: '4px'
    },
    accountNumber: {
      fontSize: '14px',
      color: '#6b7280'
    },
    accountBalance: {
      textAlign: 'right'
    },
    balanceAmount: {
      fontWeight: '500',
      color: '#1f2937',
      marginBottom: '4px'
    },
    accountEmail: {
      fontSize: '14px',
      color: '#6b7280'
    },
    quickActionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px'
    },
    quickActionButton: {
      padding: '16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      textAlign: 'center'
    },
    quickActionIcon: {
      fontSize: '24px',
      marginBottom: '8px'
    },
    quickActionText: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#1f2937'
    },
    blueAction: {
      backgroundColor: '#dbeafe'
    },
    greenAction: {
      backgroundColor: '#d1fae5'
    },
    purpleAction: {
      backgroundColor: '#ede9fe'
    },
    orangeAction: {
      backgroundColor: '#fed7aa'
    },
    spinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px'
    }
  };

  const statCards = [
    {
      title: 'Total Accounts',
      value: stats.totalAccounts,
      icon: '💳',
      change: '+12%',
      changeType: 'increase',
      color: styles.blueIcon
    },
    {
      title: 'Total Balance',
      value: `$${stats.totalBalance.toLocaleString()}`,
      icon: '💰',
      change: '+8%',
      changeType: 'increase',
      color: styles.greenIcon
    },
    {
      title: 'Recent Transactions',
      value: stats.recentTransactions,
      icon: '📈',
      change: '+23%',
      changeType: 'increase',
      color: styles.purpleIcon
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: '👥',
      change: '-2%',
      changeType: 'decrease',
      color: styles.orangeIcon
    }
  ];

  if (loading) {
    return (
      <div style={styles.spinner}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.subtitle}>Welcome back! Here's what's happening with your bank today.</p>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        {statCards.map((card, index) => (
          <div key={index} style={styles.statCard}>
            <div style={styles.statHeader}>
              <div>
                <p style={styles.statTitle}>{card.title}</p>
                <p style={styles.statValue}>{card.value}</p>
              </div>
              <div style={{ ...styles.statIcon, ...card.color }}>
                {card.icon}
              </div>
            </div>
            <div style={styles.changeContainer}>
              <span style={card.changeType === 'increase' ? styles.positiveChange : styles.negativeChange}>
                {card.changeType === 'increase' ? '📈' : '📉'}
              </span>
              <span style={{ ...styles.changeText, ...(card.changeType === 'increase' ? styles.positiveChange : styles.negativeChange) }}>
                {card.change}
              </span>
              <span style={styles.changeLabel}>from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Accounts and Quick Actions */}
      <div style={styles.contentGrid}>
        {/* Recent Accounts */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Recent Accounts</h2>
          </div>
          <div style={styles.cardContent}>
            {accounts.map((account) => (
              <div key={account._id} style={styles.accountItem}>
                <div style={styles.accountInfo}>
                  <div style={styles.accountAvatar}>
                    {account.accountHolder.charAt(0).toUpperCase()}
                  </div>
                  <div style={styles.accountDetails}>
                    <div style={styles.accountName}>{account.accountHolder}</div>
                    <div style={styles.accountNumber}>{account.accountNumber}</div>
                  </div>
                </div>
                <div style={styles.accountBalance}>
                  <div style={styles.balanceAmount}>${account.balance.toLocaleString()}</div>
                  <div style={styles.accountEmail}>{account.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Quick Actions</h2>
          </div>
          <div style={styles.cardContent}>
            <div style={styles.quickActionsGrid}>
              <button style={{ ...styles.quickActionButton, ...styles.blueAction }}>
                <div style={styles.quickActionIcon}>💳</div>
                <div style={styles.quickActionText}>New Account</div>
              </button>
              <button style={{ ...styles.quickActionButton, ...styles.greenAction }}>
                <div style={styles.quickActionIcon}>📈</div>
                <div style={styles.quickActionText}>Deposit</div>
              </button>
              <button style={{ ...styles.quickActionButton, ...styles.purpleAction }}>
                <div style={styles.quickActionIcon}>📉</div>
                <div style={styles.quickActionText}>Withdraw</div>
              </button>
              <button style={{ ...styles.quickActionButton, ...styles.orangeAction }}>
                <div style={styles.quickActionIcon}>👥</div>
                <div style={styles.quickActionText}>Customers</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
