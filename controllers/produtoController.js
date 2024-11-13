const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.getProdutos = async (req, res) => {
  const { data, error } = await supabase.from("produtos").select("*");
  if (error) return res.status(400).json(error);
  res.status(200).json(data);
};

exports.createProduto = async (req, res) => {
  const { nome, descricao, preco, categoria_id } = req.body;
  const { data, error } = await supabase
    .from("produtos")
    .insert([{ nome, descricao, preco, categoria_id }]);
  if (error) return res.status(400).json(error);
  res.status(201).json(data);
};
