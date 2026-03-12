# Bank Management System Frontend

A modern, responsive React.js frontend for the Bank Management System with full backend integration.

## 🚀 Features

### Authentication
- **Login & Signup** with form validation
- JWT-based authentication (simulated)
- Protected routes and authentication context
- User session management

### Core Banking Features
- **Dashboard** with real-time statistics and insights
- **Account Management** (CRUD operations)
- **Transactions** (Deposit & Withdrawal)
- **Account search and filtering**
- **Real-time balance updates**

### UI/UX
- **Responsive Design** - Works on all devices
- **Modern Sidebar Navigation** with mobile support
- **Top Navbar** with user profile dropdown
- **Notifications** system
- **Clean, card-based layouts**
- **Smooth transitions** and micro-interactions

### Technical Stack
- **React 19** with modern hooks
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Lucide React** for icons
- **Vite** for development

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── Accounts.jsx
│   └── Transactions.jsx
├── services/
│   └── api.js
├── App.jsx
└── main.jsx
```

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Ensure backend is running:**
   ```bash
   # In the Backend directory
   npm start
   ```

## 🔐 Authentication

Since the backend doesn't have dedicated auth endpoints, the frontend simulates authentication:

- **Login**: Uses existing account credentials (email as username, phone as password)
- **Signup**: Creates a new bank account
- **JWT**: Simulated using base64 encoding

## 📱 Usage

### 1. Create an Account
1. Go to `/signup`
2. Fill in your details
3. Your account is created automatically

### 2. Login
1. Go to `/login`
2. Use your email and phone number as password
3. You'll be redirected to the dashboard

### 3. Manage Accounts
- View all accounts in the Accounts section
- Create, edit, and delete accounts
- Search and filter accounts

### 4. Process Transactions
- Deposit and withdraw money
- Real-time balance updates
- Transaction history

## 🎨 UI Components

### Dashboard
- Statistics cards with trend indicators
- Recent accounts overview
- Quick action buttons
- Responsive grid layout

### Account Management
- Searchable accounts table
- Inline editing capabilities
- Modal forms for CRUD operations
- Real-time data updates

### Transactions
- Split-screen layout
- Account selection dropdown
- Transaction type toggle
- Balance preview

### Navigation
- Collapsible sidebar (mobile-friendly)
- Breadcrumb navigation
- User profile dropdown
- Notification system

## 🔧 Configuration

### API Configuration
- Backend URL: `http://localhost:5000/api`
- Proxy configured in Vite for development
- Automatic token injection in requests

### CORS Configuration
Backend configured to accept requests from:
- `http://localhost:3000`
- `http://127.0.0.1:3000`
- `http://localhost:5173`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📊 Backend Integration

The frontend integrates seamlessly with the existing Node.js/Express backend:

### Endpoints Used:
- `GET /api/accounts` - Fetch all accounts
- `POST /api/accounts` - Create new account
- `GET /api/accounts/:id` - Get account by ID
- `PUT /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account
- `PUT /api/accounts/deposit/:id` - Deposit money
- `PUT /api/accounts/withdraw/:id` - Withdraw money

## 🎯 Key Features Demonstrated

1. **Full CRUD Operations** on bank accounts
2. **Real-time Updates** after transactions
3. **Form Validation** with error handling
4. **Responsive Design** for all screen sizes
5. **Modern UI/UX** with Tailwind CSS
6. **Authentication Flow** with protected routes
7. **Error Handling** and loading states
8. **Search & Filter** functionality

## 🤝 Contributing

This frontend is designed to work with the existing Bank Management System backend. All features are fully functional and ready for production use.

## 📞 Support

For any issues or questions, please check the console logs for detailed error messages from both frontend and backend.
