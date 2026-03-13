const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const accountRoutes = require("./routes/accountRoutes");

const app = express();

// CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    /vercel\.app$/   // allow all vercel deployments
  ],
  credentials: true
}));

connectDB();

app.use(express.json());

app.use("/api", accountRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
