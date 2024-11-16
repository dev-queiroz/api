const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Atualizar estoque
async function updateInventoryQuantity(productId, quantity) {
  const { data, error } = await supabase
    .from("inventory")
    .update({ quantity })
    .eq("product_id", productId)
    .select();
  if (error) throw error;
  return data[0];
}

// Buscar estoque por produto
async function getInventoryByProductId(productId) {
  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .eq("product_id", productId)
    .single();
  if (error) throw error;
  return data;
}

module.exports = { updateInventoryQuantity, getInventoryByProductId };
