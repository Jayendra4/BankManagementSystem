const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");

router.post("/accounts", accountController.createAccount);

router.get("/accounts", accountController.getAllAccounts);

router.get("/accounts/:id", accountController.getAccountById);

router.put("/accounts/:id", accountController.updateAccount);

router.delete("/accounts/:id", accountController.deleteAccount);

router.put("/accounts/deposit/:id", accountController.depositMoney);

router.put("/accounts/withdraw/:id", accountController.withdrawMoney);

module.exports = router;



