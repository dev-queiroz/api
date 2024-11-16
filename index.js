const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/categorias", async (req, res) => {
  const { data, error } = await supabase.from("categorias").select("*");
  if (error) return res.status(400).json(error);
  res.json(data);
});

app.post("/categorias", async (req, res) => {
  const { nome } = req.body;
  const { data, error } = await supabase.from("categorias").insert([{ nome }]);
  if (error) return res.status(400).json(error);
  res.status(201).json(data);
});

app.put("/categorias/:id", async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  const { data, error } = await supabase
    .from("categorias")
    .update({ nome })
    .eq("id", id);
  if (error) return res.status(400).json(error);
  res.json(data);
});

app.delete("/categorias/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("categorias")
    .delete()
    .eq("id", id);
  if (error) return res.status(400).json(error);
  res.json(data);
});

app.get("/produtos", async (req, res) => {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .order("nome", { ascending: true });
  if (error) return res.status(400).json(error);
  res.json(data);
});

app.post("/produtos", async (req, res) => {
  const { nome, preco, categoria_id } = req.body;
  const { data, error } = await supabase
    .from("produtos")
    .insert([{ nome, preco, categoria_id }]);
  if (error) return res.status(400).json(error);
  res.status(201).json(data);
});

app.put("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, preco, categoria_id } = req.body;
  const { data, error } = await supabase
    .from("produtos")
    .update({ nome, preco, categoria_id })
    .eq("id", id);
  if (error) return res.status(400).json(error);
  res.json(data);
});

app.delete("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("produtos").delete().eq("id", id);
  if (error) return res.status(400).json(error);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on {port} port`);
});
