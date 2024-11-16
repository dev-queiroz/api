const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");

// login do usuário
const login = async (req, res) => {
  const { email } = req.body;

  // Verificar usuário no banco
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (error || !data)
    return res.status(401).json({ error: "Credenciais inválidas" });

  const token = jwt.sign(
    { id: data.id, email: data.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.status(200).json({ token });
};

// Obter todos os usuários
const getAllUsers = async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
};

// Obter um usuário específico com suas postagens
const getUserWithPosts = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("users")
    .select("*, posts(*)")
    .eq("id", id)
    .single();
  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: "Usuário não encontrado" });
  res.status(200).json(data);
};

// Criar novo usuário
const createUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ error: "Dados incompletos" });

  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email }]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
};

// Atualizar um usuário
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const { data, error } = await supabase
    .from("users")
    .update({ name, email })
    .eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data[0]);
};

// Deletar um usuário
const deleteUser = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("users").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ message: "Usuário deletado com sucesso" });
};

module.exports = {
  login,
  getAllUsers,
  getUserWithPosts,
  createUser,
  updateUser,
  deleteUser,
};
