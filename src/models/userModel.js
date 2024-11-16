const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Criar usuário
async function createUser(userData) {
  const { data, error } = await supabase
    .from("users")
    .insert([userData])
    .select();
  if (error) throw error;
  return data[0];
}

// Buscar usuário por email
async function findUserByEmail(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (error) throw error;
  return data;
}

// Buscar todos os usuários
async function getAllUsers() {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data;
}

module.exports = { createUser, findUserByEmail, getAllUsers };
