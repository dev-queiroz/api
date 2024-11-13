const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.createPedido = async (req, res) => {
  const { usuario_id, produtos } = req.body;
  const { data, error } = await supabase
    .from("pedidos")
    .insert([{ usuario_id, produtos, status: "pendente" }]);
  if (error) return res.status(400).json(error);
  res.status(201).json(data);
};
