const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://bank-management-system-29sdb470g-jayendras-projects-60719684.vercel.app',
    'https://bankbackend-vy7e.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

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
  console.log('GET /api/accounts - Returning accounts');
  res.json(accounts);
});

app.get('/api/accounts/:id', (req, res) => {
  const account = accounts.find(acc => acc._id === req.params.id);
  if (!account) {
    return res.status(404).json({ message: 'Account not found' });
  }
  res.json(account);
});

app.post('/api/accounts', (req, res) => {
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
  console.log('POST /api/accounts - Created account:', newAccount);
  res.status(201).json(newAccount);
});

app.put('/api/accounts/:id', (req, res) => {
  const index = accounts.findIndex(acc => acc._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Account not found' });
  }
  
  accounts[index] = { ...accounts[index], ...req.body };
  console.log('PUT /api/accounts/:id - Updated account:', accounts[index]);
  res.json(accounts[index]);
});

app.put('/api/accounts/deposit/:id', (req, res) => {
  const { amount } = req.body;
  const index = accounts.findIndex(acc => acc._id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Account not found' });
  }
  
  if (amount <= 0) {
    return res.status(400).json({ message: 'Amount must be positive' });
  }
  
  accounts[index].balance += amount;
  console.log('PUT /api/accounts/deposit/:id - Deposit successful');
  res.json(accounts[index]);
});

app.put('/api/accounts/withdraw/:id', (req, res) => {
  const { amount } = req.body;
  const index = accounts.findIndex(acc => acc._id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Account not found' });
  }
  
  if (amount <= 0) {
    return res.status(400).json({ message: 'Amount must be positive' });
  }
  
  if (accounts[index].balance < amount) {
    return res.status(400).json({ message: 'Insufficient funds' });
  }
  
  accounts[index].balance -= amount;
  console.log('PUT /api/accounts/withdraw/:id - Withdrawal successful');
  res.json(accounts[index]);
});

app.delete('/api/accounts/:id', (req, res) => {
  const index = accounts.findIndex(acc => acc._id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Account not found' });
  }
  
  const deletedAccount = accounts.splice(index, 1)[0];
  console.log('DELETE /api/accounts/:id - Deleted account:', deletedAccount);
  res.json(deletedAccount);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    cors: {
      origin: req.headers.origin,
      allowed: true
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Mock server running on port ${PORT}`);
  console.log(`📊 Available accounts: ${accounts.length}`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/api`);
});
