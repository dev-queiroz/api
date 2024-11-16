const supabase = require("../config/supabase");

// Obter todos os comentários de um post
const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  const { data, error } = await supabase
    .from("comments")
    .select("*, users(name, email)")
    .eq("post_id", postId);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
};

// Criar um novo comentário
const createComment = async (req, res) => {
  const { postId } = req.params;
  const { content, userId } = req.body;

  if (!content || !userId)
    return res
      .status(400)
      .json({ error: "Dados incompletos para criar um comentário" });

  const { data, error } = await supabase
    .from("comments")
    .insert([{ content, user_id: userId, post_id: postId }]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
};

// Atualizar um comentário
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content)
    return res.status(400).json({ error: "Conteúdo não pode estar vazio" });

  const { data, error } = await supabase
    .from("comments")
    .update({ content })
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data[0]);
};

// Deletar um comentário
const deleteComment = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("comments").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: "Comentário deletado com sucesso" });
};

module.exports = {
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
};
