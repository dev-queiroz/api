const express = require("express");
const {
  login,
  getAllUsers,
  getUserWithPosts,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", login);
router.get("/", getAllUsers);
router.get("/:id", getUserWithPosts);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
