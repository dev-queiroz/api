const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Criar pedido
async function createNewOrder(orderData) {
  const { data, error } = await supabase
    .from("orders")
    .insert([orderData])
    .select();
  if (error) throw error;
  return data[0];
}

// Buscar pedidos por usuário
async function getOrdersByUser(userId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;
  return data;
}

// Buscar detalhes do pedido
async function getOrderDetails(id) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

module.exports = { createNewOrder, getOrdersByUser, getOrderDetails };
