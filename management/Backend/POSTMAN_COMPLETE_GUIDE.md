# 🚀 Complete Postman Testing Guide

## 📋 Base URL
```
http://localhost:5000/api
```

## 👥 Test Accounts Data

### Account 1: John Smith
```json
{
  "accountNumber": "ACC001",
  "accountHolder": "John Smith",
  "balance": 5000,
  "email": "john.smith@example.com",
  "phone": "5551234567"
}
```

### Account 2: Sarah Johnson
```json
{
  "accountNumber": "ACC002",
  "accountHolder": "Sarah Johnson", 
  "balance": 3200,
  "email": "sarah.j@example.com",
  "phone": "5559876543"
}
```

### Account 3: Mike Wilson
```json
{
  "accountNumber": "ACC003",
  "accountHolder": "Mike Wilson",
  "balance": 8500,
  "email": "mike.wilson@example.com",
  "phone": "5554567890"
}
```

### Account 4: Emily Davis
```json
{
  "accountNumber": "ACC004",
  "accountHolder": "Emily Davis",
  "balance": 1200,
  "email": "emily.davis@example.com",
  "phone": "5552345678"
}
```

### Account 5: Robert Brown
```json
{
  "accountNumber": "ACC005",
  "accountHolder": "Robert Brown",
  "balance": 7500,
  "email": "robert.brown@example.com",
  "phone": "5553456789"
}
```

## 🔧 Postman Request Setup

### 1. Create Account
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/accounts`
- **Headers**: `Content-Type: application/json`
- **Body**: Select `raw` → `JSON` → Paste any account data above

### 2. Get All Accounts
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/accounts`
- **Headers**: No headers needed

### 3. Get Account by ID
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/accounts/{{accountId}}`
- **Headers**: No headers needed
- **Variables**: Replace `{{accountId}}` with actual ID from response

### 4. Update Account
- **Method**: `PUT`
- **URL**: `http://localhost:5000/api/accounts/{{accountId}}`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "accountHolder": "John Smith Jr",
  "email": "john.smith.jr@example.com",
  "phone": "5551112222"
}
```

### 5. Deposit Money
- **Method**: `PUT`
- **URL**: `http://localhost:5000/api/accounts/deposit/{{accountId}}`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "amount": 1500
}
```

### 6. Withdraw Money
- **Method**: `PUT`
- **URL**: `http://localhost:5000/api/accounts/withdraw/{{accountId}}`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "amount": 800
}
```

### 7. Delete Account
- **Method**: `DELETE`
- **URL**: `http://localhost:5000/api/accounts/{{accountId}}`
- **Headers**: No headers needed

## 🧪 Complete Test Sequence

### Step 1: Create Multiple Accounts
Create all 5 test accounts using the data above. Copy the `_id` from each response.

### Step 2: View All Accounts
```
GET http://localhost:5000/api/accounts
```
You should see all 5 accounts with their IDs.

### Step 3: Test Individual Operations
Pick one account (e.g., John Smith's account) and test:

1. **Get by ID**: Use John's `_id`
2. **Update**: Change John's details
3. **Deposit**: Add $1500 to John's account
4. **Withdraw**: Remove $800 from John's account
5. **Delete**: Remove John's account

### Step 4: Verify Final State
```
GET http://localhost:5000/api/accounts
```
You should see 4 remaining accounts.

## 📊 Expected Results

### Create Account Response (201):
```json
{
  "_id": "69b27e8a5a2a67990b87b7cb",
  "accountNumber": "ACC001",
  "accountHolder": "John Smith",
  "balance": 5000,
  "email": "john.smith@example.com",
  "phone": "5551234567",
  "createdAt": "2026-03-12T08:45:00.000Z",
  "updatedAt": "2026-03-12T08:45:00.000Z",
  "__v": 0
}
```

### Get All Accounts Response (200):
```json
[
  {
    "_id": "69b27e8a5a2a67990b87b7cb",
    "accountNumber": "ACC001",
    "accountHolder": "John Smith",
    "balance": 5000,
    "email": "john.smith@example.com",
    "phone": "5551234567",
    "createdAt": "2026-03-12T08:45:00.000Z",
    "updatedAt": "2026-03-12T08:45:00.000Z",
    "__v": 0
  }
  // ... more accounts
]
```

### Deposit Response (200):
```json
{
  "message": "Deposit successful",
  "balance": 6500
}
```

### Withdraw Response (200):
```json
{
  "message": "Withdrawal successful",
  "balance": 5700
}
```

## 🎯 Quick Start

1. **Copy any account data** from above
2. **Paste in Postman** POST request to `/api/accounts`
3. **Copy the `_id`** from response
4. **Use that ID** for all other operations
5. **Test all endpoints** with the provided data

## ✅ Success Checklist

- [ ] Create 5 test accounts
- [ ] Get all accounts (should show 5)
- [ ] Get account by ID (individual test)
- [ ] Update account details
- [ ] Deposit money (balance increases)
- [ ] Withdraw money (balance decreases)
- [ ] Delete account (account removed)
- [ ] Final count shows 4 accounts

**Your Book Management System is ready for full testing!** 🎉
