const supabase = require("../config/supabase");

exports.createItem = async (req, res) => {
  const { enterprise_id } = req.params;
  const {
    item_sku,
    item_name,
    item_description,
    item_quantity,
    item_width,
    item_height,
  } = req.body;
  const { data, error } = await supabase.from("items").insert([
    {
      item_sku,
      enterprise_id,
      item_name,
      item_description,
      item_quantity,
      item_width,
      item_height,
    },
  ]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

exports.getItemByEnterprise = async (req, res) => {
  const { enterprise_id } = req.params;
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("enterprise_id", enterprise_id);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

exports.getItemBySkuEnterprise = async (req, res) => {
  const { item_sku } = req.params;
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("item_sku", item_sku)
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

exports.updateItemData = async (req, res) => {
  const { item_sku } = req.params;
  const {
    item_name,
    item_description,
    item_quantity,
    item_width,
    item_height,
  } = req.body;
  const { data, error } = await supabase
    .from("items")
    .update({
      item_name,
      item_description,
      item_quantity,
      item_width,
      item_height,
    })
    .eq("item_sku", item_sku);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

exports.deleteItem = async (req, res) => {
  const { item_sku } = req.params;
  const { data, error } = await supabase
    .from("items")
    .delete()
    .eq("item_sku", item_sku);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
};
