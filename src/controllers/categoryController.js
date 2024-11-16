const { createCategory, getAllCategories } = require("../models/categoryModel");

// Adicionar categoria
async function addCategory(req, res) {
  const { name } = req.body;
  try {
    const category = await createCategory({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: "Erro ao adicionar categoria" });
  }
}

// Listar categorias
async function getCategories(req, res) {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
}

module.exports = { addCategory, getCategories };
