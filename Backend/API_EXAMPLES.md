# Book Management System API Examples

## ✅ Correct Account Creation Format

### Required Fields:
- `accountNumber` (string, unique)
- `accountHolder` (string, required)
- `balance` (number, required, default: 0)
- `email` (string, unique, required)
- `phone` (string, required)

### POST /api/accounts - Correct Example:
```json
{
  "accountNumber": "ACC001",
  "accountHolder": "John Doe",
  "balance": 1000,
  "email": "john@example.com",
  "phone": "1234567890"
}
```

### POST /api/accounts - Minimal Example (balance will default to 0):
```json
{
  "accountNumber": "ACC002",
  "accountHolder": "Jane Smith",
  "balance": 0,
  "email": "jane@example.com",
  "phone": "0987654321"
}
```

## ❌ Common Validation Errors:

### Error: "phone is required"
**Missing phone field**
```json
{
  "accountNumber": "ACC001",
  "accountHolder": "John Doe",
  "balance": 1000,
  "email": "john@example.com"
  // ❌ phone missing
}
```

### Error: "email is required"
**Missing email field**
```json
{
  "accountNumber": "ACC001",
  "accountHolder": "John Doe",
  "balance": 1000,
  "phone": "1234567890"
  // ❌ email missing
}
```

### Error: "accountHolder is required"
**Missing accountHolder field**
```json
{
  "accountNumber": "ACC001",
  "balance": 1000,
  "email": "john@example.com",
  "phone": "1234567890"
  // ❌ accountHolder missing
}
```

## 🧪 Test Commands:

### PowerShell (Windows):
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/accounts" -Method POST -ContentType "application/json" -Body '{
  "accountNumber": "TEST001",
  "accountHolder": "Test User",
  "balance": 1500,
  "email": "test@example.com",
  "phone": "5551234567"
}'
```

### Curl:
```bash
curl -X POST http://localhost:5000/api/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "accountNumber": "TEST001",
    "accountHolder": "Test User", 
    "balance": 1500,
    "email": "test@example.com",
    "phone": "5551234567"
  }'
```

## 📋 All API Endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/accounts` | Get all accounts |
| POST | `/api/accounts` | Create new account |
| GET | `/api/accounts/:id` | Get account by ID |
| PUT | `/api/accounts/:id` | Update account |
| DELETE | `/api/accounts/:id` | Delete account |
| PUT | `/api/accounts/deposit/:id` | Deposit money |
| PUT | `/api/accounts/withdraw/:id` | Withdraw money |

## 🎯 Quick Test:

Use this complete example to test your API:
```json
{
  "accountNumber": "DEMO001",
  "accountHolder": "Demo User",
  "balance": 2500,
  "email": "demo@example.com", 
  "phone": "9998887777"
}
```
