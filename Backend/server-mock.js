const express = require('express');
const cors = require('cors');
const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://bank-management-system-29sdb470g-jayendras-projects-60719684.vercel.app',
      'https://bankbackend-vy7e.onrender.com'
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count'],
  maxAge: 86400 // 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path} - Origin: ${req.headers.origin || 'No origin'}`);
  next();
});

// Mock data
let accounts = [
  {
    _id: '1',
    accountNumber: 'ACC001',
    accountHolder: 'John Doe',
    balance: 5000,
    email: 'john@example.com',
    phone: '123456',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    accountNumber: 'ACC002',
    accountHolder: 'Jane Smith',
    balance: 3000,
    email: 'jane@example.com',
    phone: '123456',
    createdAt: new Date().toISOString()
  }
];

let nextId = 3;

// Routes
app.get('/api/accounts', (req, res) => {
  console.log('📊 GET /api/accounts - Returning accounts');
  res.set('X-Total-Count', accounts.length);
  res.json(accounts);
});

app.get('/api/accounts/:id', (req, res) => {
  const account = accounts.find(acc => acc._id === req.params.id);
  if (!account) {
    console.log('❌ Account not found:', req.params.id);
    return res.status(404).json({ message: 'Account not found' });
  }
  console.log('✅ GET /api/accounts/:id - Found account:', account.accountNumber);
  res.json(account);
});

app.post('/api/accounts', (req, res) => {
  try {
    const { accountNumber, accountHolder, balance, email, phone } = req.body;
    
    const newAccount = {
      _id: String(nextId++),
      accountNumber: accountNumber || `ACC${String(nextId).padStart(3, '0')}`,
      accountHolder,
      balance: balance || 0,
      email,
      phone,
      createdAt: new Date().toISOString()
    };
    
    accounts.push(newAccount);
    console.log('➕ POST /api/accounts - Created account:', newAccount);
    res.status(201).json(newAccount);
  } catch (error) {
    console.error('❌ Error creating account:', error);
    res.status(400).json({ message: 'Invalid account data' });
  }
});

app.put('/api/accounts/:id', (req, res) => {
  try {
    const index = accounts.findIndex(acc => acc._id === req.params.id);
    if (index === -1) {
      console.log('❌ Account not found for update:', req.params.id);
      return res.status(404).json({ message: 'Account not found' });
    }
    
    accounts[index] = { ...accounts[index], ...req.body };
    console.log('✏️ PUT /api/accounts/:id - Updated account:', accounts[index]);
    res.json(accounts[index]);
  } catch (error) {
    console.error('❌ Error updating account:', error);
    res.status(400).json({ message: 'Invalid account data' });
  }
});

app.put('/api/accounts/deposit/:id', (req, res) => {
  try {
    const { amount } = req.body;
    const index = accounts.findIndex(acc => acc._id === req.params.id);
    
    if (index === -1) {
      console.log('❌ Account not found for deposit:', req.params.id);
      return res.status(404).json({ message: 'Account not found' });
    }
    
    if (!amount || amount <= 0) {
      console.log('❌ Invalid deposit amount:', amount);
      return res.status(400).json({ message: 'Amount must be positive' });
    }
    
    accounts[index].balance += amount;
    console.log('💰 PUT /api/accounts/deposit/:id - Deposit successful. New balance:', accounts[index].balance);
    res.json(accounts[index]);
  } catch (error) {
    console.error('❌ Error processing deposit:', error);
    res.status(500).json({ message: 'Deposit failed' });
  }
});

app.put('/api/accounts/withdraw/:id', (req, res) => {
  try {
    const { amount } = req.body;
    const index = accounts.findIndex(acc => acc._id === req.params.id);
    
    if (index === -1) {
      console.log('❌ Account not found for withdrawal:', req.params.id);
      return res.status(404).json({ message: 'Account not found' });
    }
    
    if (!amount || amount <= 0) {
      console.log('❌ Invalid withdrawal amount:', amount);
      return res.status(400).json({ message: 'Amount must be positive' });
    }
    
    if (accounts[index].balance < amount) {
      console.log('❌ Insufficient funds. Balance:', accounts[index].balance, 'Requested:', amount);
      return res.status(400).json({ message: 'Insufficient funds' });
    }
    
    accounts[index].balance -= amount;
    console.log('💸 PUT /api/accounts/withdraw/:id - Withdrawal successful. New balance:', accounts[index].balance);
    res.json(accounts[index]);
  } catch (error) {
    console.error('❌ Error processing withdrawal:', error);
    res.status(500).json({ message: 'Withdrawal failed' });
  }
});

app.delete('/api/accounts/:id', (req, res) => {
  try {
    const index = accounts.findIndex(acc => acc._id === req.params.id);
    
    if (index === -1) {
      console.log('❌ Account not found for deletion:', req.params.id);
      return res.status(404).json({ message: 'Account not found' });
    }
    
    const deletedAccount = accounts.splice(index, 1)[0];
    console.log('🗑️ DELETE /api/accounts/:id - Deleted account:', deletedAccount);
    res.json(deletedAccount);
  } catch (error) {
    console.error('❌ Error deleting account:', error);
    res.status(500).json({ message: 'Delete failed' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const healthData = { 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    cors: {
      origin: req.headers.origin,
      allowed: true
    },
    accounts: {
      total: accounts.length,
      sample: accounts.map(acc => ({
        id: acc._id,
        number: acc.accountNumber,
        holder: acc.accountHolder
      }))
    }
  };
  
  console.log('🏥 Health check requested from:', req.headers.origin);
  res.json(healthData);
});

// Root endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Bank Management System API',
    version: '1.0.0',
    endpoints: {
      accounts: '/api/accounts',
      health: '/api/health'
    },
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      message: 'CORS error: Origin not allowed',
      origin: req.headers.origin 
    });
  }
  
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  console.log('❌ Route not found:', req.method, req.path);
  res.status(404).json({ 
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Bank Management API running on port ${PORT}`);
  console.log(`📊 Available accounts: ${accounts.length}`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 CORS enabled for: http://localhost:5173, https://bank-management-system-29sdb470g-jayendras-projects-60719684.vercel.app`);
});
