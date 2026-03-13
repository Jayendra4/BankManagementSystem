import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import Reports from './pages/Reports';

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const styles = {
    app: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    },
    protectedLayout: {
      display: 'flex',
      height: '100vh',
      overflow: 'hidden'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },
    contentArea: {
      flex: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      backgroundColor: '#f9fafb'
    }
  };

  return (
    <AuthProvider>
      <Router>
        <div style={styles.app}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div style={styles.protectedLayout}>
                    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                    <div style={styles.mainContent}>
                      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                      <main style={styles.contentArea}>
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/accounts" element={<Accounts />} />
                          <Route path="/transactions" element={<Transactions />} />
                          <Route path="/customers" element={<Accounts />} />
                          <Route path="/reports" element={<Reports />} />
                          <Route path="/settings" element={<Settings />} />
                          <Route path="/" element={<Navigate to="/dashboard" />} />
                        </Routes>
                      </main>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
