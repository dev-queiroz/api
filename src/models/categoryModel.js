const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Criar categoria
async function createCategory(categoryData) {
  const { data, error } = await supabase
    .from("categories")
    .insert([categoryData])
    .select();
  if (error) throw error;
  return data[0];
}

// Buscar todas as categorias
async function getAllCategories() {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw error;
  return data;
}

module.exports = { createCategory, getAllCategories };
