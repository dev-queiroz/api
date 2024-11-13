const express = require("express");
const {
  getProdutos,
  createProduto,
} = require("../controllers/produtoController");

const router = express.Router();

router.get("/", getProdutos);
router.post("/", createProduto);

module.exports = router;
