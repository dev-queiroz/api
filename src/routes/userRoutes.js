const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userController.js");

router.post("/users/login", usersController.loginUser);
router.post("/users", usersController.createUser);
router.get("/users/:user_id", usersController.getUserById);
router.get("/users/:user_cpf", usersController.getUserByCpf)
router.put("/users/:user_id", usersController.updateUserData);
router.delete("/users/:user_id", usersController.deleteUser);

export default userRoutes;
