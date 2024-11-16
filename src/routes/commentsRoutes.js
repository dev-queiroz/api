const express = require("express");
const {
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentsController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

// Rotas de comentários
router.get("/:postId", authenticateToken, getCommentsByPostId); // Listar todos os comentários de um post
router.post("/:postId", authenticateToken, createComment); // Criar um comentário para um post
router.put("/:id", authenticateToken, updateComment); // Atualizar um comentário
router.delete("/:id", authenticateToken, deleteComment); // Deletar um comentário

module.exports = router;
