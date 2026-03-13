const Account = require('../models/Account');

// Create a new account
const createAccount = async (req, res) => {
  try {
    const { accountNumber, accountHolder, balance, email, phone } = req.body;

    // Check if account already exists
    const existingAccount = await Account.findOne({
      $or: [{ accountNumber }, { email }]
    });

    if (existingAccount) {
      return res.status(400).json({
        message: 'Account with this account number or email already exists'
      });
    }

    const account = new Account({
      accountNumber,
      accountHolder,
      balance,
      email,
      phone
    });

    const savedAccount = await account.save();
    res.status(201).json(savedAccount);
  } catch (error) {
    console.error('Create Account Error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all accounts
const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().sort({ createdAt: -1 });
    res.status(200).json(accounts);
  } catch (error) {
    console.error('Get All Accounts Error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Get account by ID
const getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    
    if (!account) {
      return res.status(404).json({
        message: 'Account not found'
      });
    }

    res.status(200).json(account);
  } catch (error) {
    console.error('Get Account By ID Error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Update account
const updateAccount = async (req, res) => {
  try {
    const { accountNumber, accountHolder, email, phone } = req.body;
    
    const account = await Account.findByIdAndUpdate(
      req.params.id,
      { accountNumber, accountHolder, email, phone },
      { new: true, runValidators: true }
    );

    if (!account) {
      return res.status(404).json({
        message: 'Account not found'
      });
    }

    res.status(200).json(account);
  } catch (error) {
    console.error('Update Account Error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Account number or email already exists'
      });
    }
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete account
const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    
    if (!account) {
      return res.status(404).json({
        message: 'Account not found'
      });
    }

    res.status(200).json({
      message: 'Account deleted successfully',
      account
    });
  } catch (error) {
    console.error('Delete Account Error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Deposit money
const depositMoney = async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: 'Amount must be positive'
      });
    }

    const account = await Account.findByIdAndUpdate(
      req.params.id,
      { $inc: { balance: amount } },
      { new: true }
    );

    if (!account) {
      return res.status(404).json({
        message: 'Account not found'
      });
    }

    res.status(200).json({
      message: `Deposit of $${amount} successful`,
      account
    });
  } catch (error) {
    console.error('Deposit Money Error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Withdraw money
const withdrawMoney = async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: 'Amount must be positive'
      });
    }

    const account = await Account.findById(req.params.id);
    
    if (!account) {
      return res.status(404).json({
        message: 'Account not found'
      });
    }

    if (account.balance < amount) {
      return res.status(400).json({
        message: 'Insufficient funds'
      });
    }

    account.balance -= amount;
    await account.save();

    res.status(200).json({
      message: `Withdrawal of $${amount} successful`,
      account
    });
  } catch (error) {
    console.error('Withdraw Money Error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
  depositMoney,
  withdrawMoney
};
