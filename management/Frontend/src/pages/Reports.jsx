import React, { useState, useEffect } from 'react';
import { accountAPI } from '../services/api';

const Reports = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchAccounts();
    generateMockTransactions();
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

  const generateMockTransactions = () => {
    const mockTransactions = [
      { id: 1, type: 'deposit', account: 'ACC001', amount: 5000, date: new Date(Date.now() - 86400000), status: 'completed' },
      { id: 2, type: 'withdrawal', account: 'ACC002', amount: 2000, date: new Date(Date.now() - 172800000), status: 'completed' },
      { id: 3, type: 'deposit', account: 'ACC001', amount: 3000, date: new Date(Date.now() - 259200000), status: 'completed' },
      { id: 4, type: 'withdrawal', account: 'ACC002', amount: 1500, date: new Date(Date.now() - 345600000), status: 'pending' },
      { id: 5, type: 'deposit', account: 'ACC003', amount: 7000, date: new Date(Date.now() - 432000000), status: 'completed' },
    ];
    setTransactions(mockTransactions);
  };

  const calculateMetrics = () => {
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    const totalTransactions = transactions.length;
    const completedTransactions = transactions.filter(t => t.status === 'completed').length;
    const totalDeposits = transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0);
    const totalWithdrawals = transactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0);
    const netFlow = totalDeposits - totalWithdrawals;

    return {
      totalBalance,
      totalTransactions,
      completedTransactions,
      totalDeposits,
      totalWithdrawals,
      netFlow,
      successRate: totalTransactions > 0 ? (completedTransactions / totalTransactions * 100).toFixed(1) : 0
    };
  };

  const metrics = calculateMetrics();

  const styles = {
    container: {
      padding: '32px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px'
    },
    titleSection: {
      flex: 1
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
      color: '#718096'
    },
    timeRangeSelector: {
      display: 'flex',
      gap: '8px',
      backgroundColor: '#f7fafc',
      padding: '4px',
      borderRadius: '8px'
    },
    timeRangeButton: {
      padding: '8px 16px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      color: '#718096',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    activeTimeRange: {
      backgroundColor: 'white',
      color: '#4299e1',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    metricCard: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
      border: '1px solid #f7fafc',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '4px solid #4299e1'
    },
    metricIcon: {
      fontSize: '24px',
      marginBottom: '12px',
      opacity: '0.8'
    },
    metricLabel: {
      fontSize: '12px',
      color: '#718096',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontWeight: '500'
    },
    metricValue: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1a202c',
      marginBottom: '8px'
    },
    metricChange: {
      fontSize: '12px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    positiveChange: {
      color: '#48bb78'
    },
    negativeChange: {
      color: '#f56565'
    },
    chartCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
      border: '1px solid #f7fafc',
      marginBottom: '32px'
    },
    chartTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1a202c',
      marginBottom: '24px'
    },
    chartPlaceholder: {
      height: '300px',
      backgroundColor: '#f7fafc',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#718096',
      fontSize: '14px'
    },
    tableCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
      border: '1px solid #f7fafc'
    },
    tableTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1a202c',
      marginBottom: '24px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      backgroundColor: '#f7fafc'
    },
    tableHeaderCell: {
      padding: '12px 16px',
      textAlign: 'left',
      fontSize: '12px',
      fontWeight: '500',
      color: '#718096',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      borderBottom: '1px solid #e2e8f0'
    },
    tableCell: {
      padding: '16px',
      borderBottom: '1px solid #f7fafc',
      fontSize: '14px',
      color: '#1a202c'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: '500',
      textTransform: 'uppercase'
    },
    statusCompleted: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    statusPending: {
      backgroundColor: '#fed7d7',
      color: '#9c4221'
    },
    typeBadge: {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: '500',
      textTransform: 'uppercase'
    },
    typeDeposit: {
      backgroundColor: '#c6f6d5',
      color: '#22543d'
    },
    typeWithdrawal: {
      backgroundColor: '#fed7d7',
      color: '#742a2a'
    },
    exportButton: {
      padding: '8px 16px',
      backgroundColor: '#4299e1',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
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
        <div style={styles.titleSection}>
          <h1 style={styles.title}>Reports</h1>
          <p style={styles.subtitle}>Track your banking activity and performance metrics</p>
        </div>
        <div style={styles.timeRangeSelector}>
          <button
            style={{ ...styles.timeRangeButton, ...(timeRange === 'day' ? styles.activeTimeRange : {}) }}
            onClick={() => setTimeRange('day')}
          >
            Today
          </button>
          <button
            style={{ ...styles.timeRangeButton, ...(timeRange === 'week' ? styles.activeTimeRange : {}) }}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button
            style={{ ...styles.timeRangeButton, ...(timeRange === 'month' ? styles.activeTimeRange : {}) }}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button
            style={{ ...styles.timeRangeButton, ...(timeRange === 'year' ? styles.activeTimeRange : {}) }}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>

      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <div style={styles.metricIcon}>💰</div>
          <div style={styles.metricLabel}>Total Balance</div>
          <div style={styles.metricValue}>${metrics.totalBalance.toLocaleString()}</div>
          <div style={{ ...styles.metricChange, ...styles.positiveChange }}>
            ↑ 12.5% from last {timeRange}
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricIcon}>📊</div>
          <div style={styles.metricLabel}>Total Transactions</div>
          <div style={styles.metricValue}>{metrics.totalTransactions}</div>
          <div style={{ ...styles.metricChange, ...styles.positiveChange }}>
            ↑ 8.2% from last {timeRange}
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricIcon}>✅</div>
          <div style={styles.metricLabel}>Success Rate</div>
          <div style={styles.metricValue}>{metrics.successRate}%</div>
          <div style={{ ...styles.metricChange, ...styles.positiveChange }}>
            ↑ 2.1% from last {timeRange}
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricIcon}>💵</div>
          <div style={styles.metricLabel}>Net Cash Flow</div>
          <div style={styles.metricValue}>
            {metrics.netFlow >= 0 ? '+' : ''}${metrics.netFlow.toLocaleString()}
          </div>
          <div style={{
            ...styles.metricChange,
            ...(metrics.netFlow >= 0 ? styles.positiveChange : styles.negativeChange)
          }}>
            {metrics.netFlow >= 0 ? '↑' : '↓'} {Math.abs(metrics.netFlow / metrics.totalDeposits * 100).toFixed(1)}% from deposits
          </div>
        </div>
      </div>

      <div style={styles.chartCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={styles.chartTitle}>Transaction Overview</h2>
          <button style={styles.exportButton}>
            📥 Export Data
          </button>
        </div>
        <div style={styles.chartPlaceholder}>
          📈 Chart visualization would appear here (Line chart showing transaction trends over time)
        </div>
      </div>

      <div style={styles.tableCard}>
        <h2 style={styles.tableTitle}>Recent Transactions</h2>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>Transaction ID</th>
              <th style={styles.tableHeaderCell}>Type</th>
              <th style={styles.tableHeaderCell}>Account</th>
              <th style={styles.tableHeaderCell}>Amount</th>
              <th style={styles.tableHeaderCell}>Date</th>
              <th style={styles.tableHeaderCell}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td style={styles.tableCell}>#{transaction.id.toString().padStart(6, '0')}</td>
                <td style={styles.tableCell}>
                  <span style={{
                    ...styles.typeBadge,
                    ...(transaction.type === 'deposit' ? styles.typeDeposit : styles.typeWithdrawal)
                  }}>
                    {transaction.type}
                  </span>
                </td>
                <td style={styles.tableCell}>{transaction.account}</td>
                <td style={styles.tableCell}>
                  {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </td>
                <td style={styles.tableCell}>
                  {transaction.date.toLocaleDateString()}
                </td>
                <td style={styles.tableCell}>
                  <span style={{
                    ...styles.statusBadge,
                    ...(transaction.status === 'completed' ? styles.statusCompleted : styles.statusPending)
                  }}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
