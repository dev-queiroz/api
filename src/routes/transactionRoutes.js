const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.post("/transaction", transactionController.createTransaction);
router.get("/transaction/:transaction_id", transactionController.getTransactionById);
router.get("/transactions/:enterprise_id", transactionController.getTransactionsByEnterprise);
router.put("/transaction/:transaction_id", transactionController.updateTransaction);
router.delete("/transaction/:transaction_id", transactionController.deleteTransaction);

module.exports = router;
