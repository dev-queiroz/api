import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import supabase from "../services/supabaseClient.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await supabase
    .from("users")
    .insert({ email, password_hash: hashedPassword });

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user || error)
    return res.status(400).json({ error: "Invalid email or password" });

  const isValid = await bcrypt.compare(password, user.password_hash);

  if (!isValid)
    return res.status(400).json({ error: "Invalid email or password" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET
  );

  res.status(200).json({ token });
};
