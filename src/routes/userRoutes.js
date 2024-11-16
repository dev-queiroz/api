const express = require("express");
const { register, login, getUsers } = require("../controllers/userController");
const { authenticate, authorize } = require("../utils/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", authenticate, authorize("admin"), getUsers);

module.exports = router;
