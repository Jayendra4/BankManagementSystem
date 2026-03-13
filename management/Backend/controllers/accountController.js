const Account = require("../models/accountModel");


// Create Account
exports.createAccount = async (req, res) => {
  try {
    const account = new Account(req.body);
    const savedAccount = await account.save();

    res.status(201).json(savedAccount);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get All Accounts
exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Account by ID
exports.getAccountById = async (req, res) => {
  try {

    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json(account);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Account
exports.updateAccount = async (req, res) => {
  try {

    const updated = await Account.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete Account
exports.deleteAccount = async (req, res) => {
  try {

    await Account.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Account deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Deposit Money
exports.depositMoney = async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        message: "Valid deposit amount is required" 
      });
    }

    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    account.balance += Number(amount);
    await account.save();

    res.status(200).json({
      message: "Deposit successful",
      balance: account.balance
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Withdraw Money
exports.withdrawMoney = async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        message: "Valid withdrawal amount is required" 
      });
    }

    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (account.balance < Number(amount)) {
      return res.status(400).json({
        message: "Insufficient balance"
      });
    }

    account.balance -= Number(amount);
    await account.save();

    res.status(200).json({
      message: "Withdrawal successful",
      balance: account.balance
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};