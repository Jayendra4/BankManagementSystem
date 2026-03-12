import axios from 'axios';

const API_BASE_URL = '/api'; // Use proxy for development

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Making request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    if (error.code === 'NETWORK_ERROR') {
      console.error('Network error - backend may be down');
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Provide more detailed error messages
    if (error.response) {
      // Server responded with error status
      error.message = error.response.data?.message || `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      error.message = 'Network error - unable to connect to server';
    } else {
      // Something else happened
      error.message = error.message || 'An unexpected error occurred';
    }
    
    return Promise.reject(error);
  }
);

// Auth services
export const authAPI = {
  login: async (credentials) => {
    try {
      // Since your backend doesn't have auth endpoints, we'll simulate login
      // In a real app, this would be: api.post('/auth/login', credentials)
      const response = await api.get('/accounts');
      const user = response.data.find(acc => acc.email === credentials.email);
      
      if (user && user.phone === credentials.password) {
        const token = btoa(JSON.stringify({ id: user._id, email: user.email }));
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return { user, token };
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  signup: async (userData) => {
    try {
      // Create a new account as registration
      const response = await api.post('/accounts', {
        accountNumber: `ACC${Date.now()}`,
        accountHolder: userData.name,
        balance: 0,
        email: userData.email,
        phone: userData.password
      });
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Account services
export const accountAPI = {
  getAllAccounts: async () => {
    try {
      const response = await api.get('/accounts');
      return response;
    } catch (error) {
      console.error('Get accounts error:', error);
      throw error;
    }
  },
  getAccountById: (id) => api.get(`/accounts/${id}`),
  createAccount: (accountData) => api.post('/accounts', accountData),
  updateAccount: (id, accountData) => api.put(`/accounts/${id}`, accountData),
  deleteAccount: (id) => api.delete(`/accounts/${id}`),
  deposit: (id, amount) => api.put(`/accounts/deposit/${id}`, { amount }),
  withdraw: (id, amount) => api.put(`/accounts/withdraw/${id}`, { amount }),
};

export default api;
