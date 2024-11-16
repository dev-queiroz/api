const {
  createNewOrder,
  getOrdersByUser,
  getOrderDetails,
} = require("../models/orderModel");

// Criar pedido
async function createOrder(req, res) {
  const { userId, items, totalPrice } = req.body;
  try {
    const order = await createNewOrder({ userId, items, totalPrice });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar pedido" });
  }
}

// Listar pedidos do usuário
async function getOrders(req, res) {
  const userId = req.user.id;
  try {
    const orders = await getOrdersByUser(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
}

// Detalhar pedido
async function getOrderById(req, res) {
  const { id } = req.params;
  try {
    const order = await getOrderDetails(id);
    if (!order) return res.status(404).json({ error: "Pedido não encontrado" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pedido" });
  }
}

module.exports = { createOrder, getOrders, getOrderById };
