const express = require("express");
const testRoutes = require("./routes/testRoutes");

const app = express();

app.use(express.json());

app.use("/api", testRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});
