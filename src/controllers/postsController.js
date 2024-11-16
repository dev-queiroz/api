const supabase = require("../config/supabase");

// Obter todas as postagens
const getAllPosts = async (req, res) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, users(name, email)");
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
};

// Obter uma postagem específica
const getPostById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("posts")
    .select("*, users(name, email)")
    .eq("id", id)
    .single();
  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: "Postagem não encontrada" });
  res.status(200).json(data);
};

// Criar nova postagem
const createPost = async (req, res) => {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId)
    return res.status(400).json({ error: "Dados incompletos" });

  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, content, user_id: userId }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
};

// Atualizar uma postagem
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const { data, error } = await supabase
    .from("posts")
    .update({ title, content })
    .eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data[0]);
};

// Deletar uma postagem
const deletePost = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ message: "Postagem deletada com sucesso" });
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
