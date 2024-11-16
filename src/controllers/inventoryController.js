const {
  updateInventoryQuantity,
  getInventoryByProductId,
} = require("../models/inventoryModel");

// Atualizar estoque
async function updateInventory(req, res) {
  const { productId } = req.params;
  const { quantity } = req.body;
  try {
    const inventory = await updateInventoryQuantity(productId, quantity);
    if (!inventory)
      return res
        .status(404)
        .json({ error: "Produto não encontrado no estoque" });
    res.json(inventory);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar estoque" });
  }
}

// Consultar estoque
async function getInventory(req, res) {
  const { productId } = req.params;
  try {
    const inventory = await getInventoryByProductId(productId);
    if (!inventory)
      return res.status(404).json({ error: "Estoque não encontrado" });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar estoque" });
  }
}

module.exports = { updateInventory, getInventory };
