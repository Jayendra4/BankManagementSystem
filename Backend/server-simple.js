const express = require("express");
const connectDB = require("./config/db");
const accountRoutes = require("./routes/accountRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use("/api", accountRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
