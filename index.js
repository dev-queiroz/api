require("dotenv").config();
const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = process.env.PORT || 3000;

// Supabase config
const supabaseUrl = process.env.SUPABASE_URL;
console.log(supabaseUrl);
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
app.use(express.json());

// Cadastro
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) throw error;
    res.status(200).json({ message: "Signup successful", user: data.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) throw error;
    res
      .status(200)
      .json({ message: "Signin successful", session: data.session });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// "Deslog"
app.post("/signout", async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    res.status(200).json({ message: "Signout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// auth
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw error;
    // If we reach here, the user is authenticated
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Create (POST)
app.post("/items", authenticateUser, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("items")
      .insert([req.body])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read All (GET)
app.get("/items", authenticateUser, async (req, res) => {
  try {
    const { data, error } = await supabase.from("items").select("*");

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read One (GET)
app.get("/items/:id", authenticateUser, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error) throw error;
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update (PUT)
app.put("/items/:id", authenticateUser, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("items")
      .update(req.body)
      .eq("id", req.params.id)
      .select();

    if (error) throw error;
    if (data.length > 0) {
      res.json(data[0]);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete (DELETE)
app.delete("/items/:id", authenticateUser, async (req, res) => {
  try {
    const { error } = await supabase
      .from("items")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
