const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProductData,
} = require("../models/productModel");

// Adicionar produto
async function addProduct(req, res) {
  const { name, price, category_id } = req.body;
  try {
    const product = await createProduct({ name, price, category_id });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Erro ao adicionar produto" });
  }
}

// Listar produtos
async function getProducts(req, res) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
}

// Detalhar produto
async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await getProduct(id);
    if (!product)
      return res.status(404).json({ error: "Produto não encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
}

// Atualizar produto
async function updateProduct(req, res) {
  const { id } = req.params;
  const updates = req.body;
  try {
    const product = await updateProductData(id, updates);
    if (!product)
      return res.status(404).json({ error: "Produto não encontrado" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar produto" });
  }
}

module.exports = { addProduct, getProducts, getProductById, updateProduct };
