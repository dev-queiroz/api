const supabase = require("../config/supabase.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.loginUser = async (req, res) => {
  const { user_email, user_password } = req.body;
  try {
    const { data, error } = await supabase
      .from("users")
      .select("user_id, user_email, user_password")
      .eq("user_email", user_email)
      .single();

    if (error) return res.status(400).json({ error: error.message });

    const validPassword = await bcrypt.compare(
      user_password,
      data.user_password
    );
    if (!validPassword)
      return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { user_id: data.user_id, user_email: data.user_email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { user_name, user_cpf, user_email, user_password } = req.body;
  const passHashed = await bcrypt.hash(user_password, 10);
  const { data, error } = await supabase
    .from("users")
    .insert([{ user_name, user_cpf, user_email, user_password: passHashed }]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

exports.getUserById = async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user_id)
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

exports.getUserByCpf = async (req, res) => {
  const { user_cpf } = req.params;
  const { enterprise_id } = req.user;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_cpf", user_cpf)
      .eq("enterprise_id", enterprise_id)
      .single();

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserData = async (req, res) => {
  const { user_id } = req.params;
  const { user_name, user_cpf, user_email, user_password } = req.body;
  const passHashed = await bcrypt.hash(user_password, 10);
  const { data, error } = await supabase
    .from("users")
    .update({ user_name, user_cpf, user_email, user_password: passHashed })
    .eq("user_id", user_id);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

exports.deleteUser = async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("user_id", user_id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
};
