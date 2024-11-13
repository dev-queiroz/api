const express = require("express");
const { createPedido } = require("../controllers /pedidoController");

const router = express.Router();

router.post("/", createPedido);

module.exports = router;
