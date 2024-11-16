const express = require("express");
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
} = require("../controllers/productController");
const { authenticate, authorize } = require("../utils/auth");

const router = express.Router();

router.post("/", authenticate, authorize("employee"), addProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", authenticate, authorize("admin", "employee"), updateProduct);

module.exports = router;
