const express = require("express");
const {
  updateInventory,
  getInventory,
} = require("../controllers/inventoryController");
const { authenticate, authorize } = require("../utils/auth");

const router = express.Router();

router.put("/:productId", authenticate, authorize("admin"), updateInventory);
router.get("/", authenticate, authorize("admin"), getInventory);

module.exports = router;
