# Postman Test Examples

## 📋 Complete API Test Collection

### 1. Create Account
```http
POST http://localhost:5000/api/accounts
Content-Type: application/json

{
  "accountNumber": "ACC001",
  "accountHolder": "John Doe",
  "balance": 1000,
  "email": "john@example.com",
  "phone": "1234567890"
}
```

### 2. Get All Accounts
```http
GET http://localhost:5000/api/accounts
```

### 3. Get Account by ID
```http
GET http://localhost:5000/api/accounts/YOUR_ACCOUNT_ID_HERE
```

### 4. Update Account
```http
PUT http://localhost:5000/api/accounts/YOUR_ACCOUNT_ID_HERE
Content-Type: application/json

{
  "accountHolder": "Jane Doe",
  "email": "jane.doe@example.com"
}
```

### 5. Deposit Money
```http
PUT http://localhost:5000/api/accounts/deposit/YOUR_ACCOUNT_ID_HERE
Content-Type: application/json

{
  "amount": 500
}
```

### 6. Withdraw Money
```http
PUT http://localhost:5000/api/accounts/withdraw/YOUR_ACCOUNT_ID_HERE
Content-Type: application/json

{
  "amount": 200
}
```

### 7. Delete Account
```http
DELETE http://localhost:5000/api/accounts/YOUR_ACCOUNT_ID_HERE
```

## 🎯 Expected Responses

### Create Account - Success (201)
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "accountNumber": "ACC001",
  "accountHolder": "John Doe",
  "balance": 1000,
  "email": "john@example.com",
  "phone": "1234567890",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "__v": 0
}
```

### Get All Accounts - Success (200)
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "accountNumber": "ACC001",
    "accountHolder": "John Doe",
    "balance": 1000,
    "email": "john@example.com",
    "phone": "1234567890",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "__v": 0
  }
]
```

### Deposit Money - Success (200)
```json
{
  "message": "Deposit successful",
  "balance": 1500
}
```

### Withdraw Money - Success (200)
```json
{
  "message": "Withdrawal successful", 
  "balance": 1300
}
```

## ❌ Error Examples

### Validation Error (400)
```json
{
  "message": "Valid deposit amount is required"
}
```

### Account Not Found (404)
```json
{
  "message": "Account not found"
}
```

### Insufficient Balance (400)
```json
{
  "message": "Insufficient balance"
}
```

## 🧪 Test Scenarios

### Scenario 1: Complete Account Lifecycle
1. Create account with $1000
2. Get account details
3. Deposit $500 (balance: $1500)
4. Withdraw $200 (balance: $1300)
5. Update account holder name
6. Delete account

### Scenario 2: Error Handling
1. Try to withdraw more than balance
2. Try to deposit negative amount
3. Try to get non-existent account
4. Try to create account with duplicate email

## 📱 Postman Setup Tips

### Environment Variables
```
baseUrl = http://localhost:5000
accountId = (copy from create account response)
```

### Collection Variables
- Automatically set `accountId` after creating account
- Use `{{baseUrl}}` and `{{accountId}}` in requests

### Test Scripts
Add tests to validate responses:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has account data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('balance');
});
```
