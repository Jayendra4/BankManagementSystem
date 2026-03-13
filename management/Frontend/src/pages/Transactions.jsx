import React, { useState, useEffect } from 'react';
import { accountAPI } from '../services/api';

const Transactions = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('deposit');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [recentTransactions, setRecentTransactions] = useState([]);

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
    if (!selectedAccount || !amount) {
      setMessage('Please select an account and enter an amount');
      return;
    }

    setProcessing(true);
    setMessage('');

    try {
      const account = accounts.find(acc => acc._id === selectedAccount);
      
      if (transactionType === 'deposit') {
        await accountAPI.deposit(selectedAccount, parseFloat(amount));
        setMessage('Deposit successful!');
        addTransaction({
          type: 'deposit',
          accountName: account.accountHolder,
          accountNumber: account.accountNumber,
          amount: parseFloat(amount),
          timestamp: new Date()
        });
      } else {
        await accountAPI.withdraw(selectedAccount, parseFloat(amount));
        setMessage('Withdrawal successful!');
        addTransaction({
          type: 'withdrawal',
          accountName: account.accountHolder,
          accountNumber: account.accountNumber,
          amount: parseFloat(amount),
          timestamp: new Date()
        });
      }
      
      setAmount('');
      setSelectedAccount('');
      fetchAccounts();
    } catch (error) {
      setMessage(error.message || 'Transaction failed');
    } finally {
      setProcessing(false);
    }
  };

  const addTransaction = (transaction) => {
    setRecentTransactions(prev => [transaction, ...prev.slice(0, 4)]);
  };

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
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
      marginBottom: '32px'
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
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#4a5568',
      marginBottom: '8px'
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '14px',
      backgroundColor: '#f7fafc',
      outline: 'none',
      transition: 'all 0.2s'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '14px',
      backgroundColor: '#f7fafc',
      outline: 'none',
      transition: 'all 0.2s'
    },
    radioGroup: {
      display: 'flex',
      gap: '16px',
      marginBottom: '24px'
    },
    radioOption: {
      flex: 1,
      position: 'relative'
    },
    radioInput: {
      position: 'absolute',
      opacity: '0'
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#4a5568',
      cursor: 'pointer',
      transition: 'all 0.2s',
      backgroundColor: '#f7fafc'
    },
    radioInputChecked: {
      borderColor: '#4299e1',
      backgroundColor: '#ebf8ff',
      color: '#2b6cb0'
    },
    submitButton: {
      width: '100%',
      padding: '14px 24px',
      backgroundColor: '#4299e1',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: '0 1px 3px rgba(66, 153, 225, 0.3)'
    },
    submitButtonDisabled: {
      backgroundColor: '#a0aec0',
      cursor: 'not-allowed',
      boxShadow: 'none'
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
    accountsList: {
      maxHeight: '400px',
      overflowY: 'auto'
    },
    accountItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      backgroundColor: '#f7fafc',
      borderRadius: '12px',
      marginBottom: '12px',
      transition: 'all 0.2s'
    },
    accountItemHover: {
      backgroundColor: '#edf2f7',
      transform: 'translateX(4px)'
    },
    accountInfo: {
      flex: 1
    },
    accountName: {
      fontWeight: '600',
      color: '#1a202c',
      marginBottom: '4px',
      fontSize: '14px'
    },
    accountNumber: {
      fontSize: '12px',
      color: '#718096'
    },
    accountBalance: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#2d3748'
    },
    transactionsList: {
      marginTop: '24px'
    },
    transactionItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      backgroundColor: '#f7fafc',
      borderRadius: '12px',
      marginBottom: '12px',
      borderLeft: '4px solid #4299e1'
    },
    transactionWithdrawal: {
      borderLeftColor: '#f56565'
    },
    transactionInfo: {
      flex: 1
    },
    transactionType: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#718096',
      marginBottom: '4px',
      textTransform: 'uppercase'
    },
    transactionAccount: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#1a202c',
      marginBottom: '2px'
    },
    transactionTime: {
      fontSize: '12px',
      color: '#a0aec0'
    },
    transactionAmount: {
      fontSize: '16px',
      fontWeight: '700'
    },
    depositAmount: {
      color: '#48bb78'
    },
    withdrawalAmount: {
      color: '#f56565'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '32px'
    },
    statCard: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0'
    },
    statLabel: {
      fontSize: '12px',
      color: '#718096',
      marginBottom: '4px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1a202c'
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalAccounts = accounts.length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Transactions</h1>
        <p style={styles.subtitle}>Process deposits and withdrawals for accounts</p>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Balance</div>
          <div style={styles.statValue}>${totalBalance.toLocaleString()}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Accounts</div>
          <div style={styles.statValue}>{totalAccounts}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Recent Transactions</div>
          <div style={styles.statValue}>{recentTransactions.length}</div>
        </div>
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>New Transaction</h2>
          
          {message && (
            <div style={{
              ...styles.message,
              ...(message.includes('successful') ? styles.successMessage : styles.errorMessage)
            }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.radioGroup}>
              <div style={styles.radioOption}>
                <input
                  type="radio"
                  id="deposit"
                  value="deposit"
                  checked={transactionType === 'deposit'}
                  onChange={(e) => setTransactionType(e.target.value)}
                  style={styles.radioInput}
                />
                <label 
                  htmlFor="deposit" 
                  style={{
                    ...styles.radioLabel,
                    ...(transactionType === 'deposit' ? styles.radioInputChecked : {})
                  }}
                >
                  💰 Deposit
                </label>
              </div>
              <div style={styles.radioOption}>
                <input
                  type="radio"
                  id="withdraw"
                  value="withdraw"
                  checked={transactionType === 'withdraw'}
                  onChange={(e) => setTransactionType(e.target.value)}
                  style={styles.radioInput}
                />
                <label 
                  htmlFor="withdraw" 
                  style={{
                    ...styles.radioLabel,
                    ...(transactionType === 'withdraw' ? styles.radioInputChecked : {})
                  }}
                >
                  💸 Withdraw
                </label>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Select Account</label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                style={styles.select}
                required
              >
                <option value="">Choose an account...</option>
                {accounts.map((account) => (
                  <option key={account._id} value={account._id}>
                    {account.accountNumber} - {account.accountHolder}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Amount ($)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={styles.input}
                placeholder="Enter amount"
                required
              />
            </div>

            <button
              type="submit"
              disabled={processing}
              style={{
                ...styles.submitButton,
                ...(processing ? styles.submitButtonDisabled : {})
              }}
            >
              {processing ? 'Processing...' : `Process ${transactionType}`}
            </button>
          </form>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Account Balances</h2>
          <div style={styles.accountsList}>
            {accounts.map((account) => (
              <div key={account._id} style={styles.accountItem}>
                <div style={styles.accountInfo}>
                  <div style={styles.accountName}>{account.accountHolder}</div>
                  <div style={styles.accountNumber}>{account.accountNumber}</div>
                </div>
                <div style={styles.accountBalance}>
                  ${account.balance.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {recentTransactions.length > 0 && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Recent Transactions</h2>
          <div style={styles.transactionsList}>
            {recentTransactions.map((transaction, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.transactionItem,
                  ...(transaction.type === 'withdrawal' ? styles.transactionWithdrawal : {})
                }}
              >
                <div style={styles.transactionInfo}>
                  <div style={styles.transactionType}>{transaction.type}</div>
                  <div style={styles.transactionAccount}>
                    {transaction.accountName} ({transaction.accountNumber})
                  </div>
                  <div style={styles.transactionTime}>
                    {new Date(transaction.timestamp).toLocaleString()}
                  </div>
                </div>
                <div style={{
                  ...styles.transactionAmount,
                  ...(transaction.type === 'deposit' ? styles.depositAmount : styles.withdrawalAmount)
                }}>
                  {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
