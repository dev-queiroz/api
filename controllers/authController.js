const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.signup = async (req, res) => {
  const { email, password, nome } = req.body;
  const { user, error } = await supabase.auth.signUp({ email, password });

  if (error) return res.status(400).json(error);

  await supabase.from("usuarios").insert([{ id: user.id, nome, email }]);
  res.status(201).json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const { user, error } = await supabase.auth.signIn({ email, password });

  if (error) return res.status(400).json(error);
  res.status(200).json(user);
};
