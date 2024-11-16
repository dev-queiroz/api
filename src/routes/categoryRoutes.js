const express = require("express");
const {
  addCategory,
  getCategories,
} = require("../controllers/categoryController");
const { authenticate, authorize } = require("../utils/auth");

const router = express.Router();

router.post("/", authenticate, authorize("admin"), addCategory);
router.get("/", getCategories);

module.exports = router;
