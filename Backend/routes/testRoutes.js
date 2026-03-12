const express = require("express");
const router = express.Router();

// Test route without any controller
router.post("/accounts", (req, res) => {
  res.status(201).json({ message: "Test successful", data: req.body });
});

module.exports = router;
