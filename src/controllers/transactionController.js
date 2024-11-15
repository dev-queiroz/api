const supabase = require("../config/supabase");

exports.createTransaction = async (req, res) => {
  const { enterprise_id, item_sku, quantity, total_price } = req.body;
  const { data, error } = await supabase.from("transactions").insert([
    {
      enterprise_id,
      item_sku,
      quantity,
      total_price,
    },
  ]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

exports.getTransactionById = async (req, res) => {
  const { transaction_id } = req.params;
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("transaction_id", transaction_id)
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

exports.getTransactionsByEnterprise = async (req, res) => {
  const { enterprise_id } = req.params;
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("enterprise_id", enterprise_id);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

exports.updateTransaction = async (req, res) => {
  const { transaction_id } = req.params;
  const { quantity, total_price } = req.body;
  const { data, error } = await supabase
    .from("transactions")
    .update({ quantity, total_price })
    .eq("transaction_id", transaction_id);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

exports.deleteTransaction = async (req, res) => {
  const { transaction_id } = req.params;
  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .eq("transaction_id", transaction_id);

  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
};
