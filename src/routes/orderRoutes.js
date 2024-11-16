const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
} = require("../controllers/orderController");
const { authenticate, authorize } = require("../utils/auth");

const router = express.Router();

router.post("/", authenticate, authorize("client"), createOrder);
router.get("/", authenticate, authorize("client", "admin", "employee"), getOrders);
router.get("/:id", authenticate, authorize("employee"), getOrderById);

module.exports = router;
