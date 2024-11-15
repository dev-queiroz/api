const supabase = require("../config/supabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginEnterprise = async (req, res) => {
  const { enterprise_email, enterprise_password } = req.boby;
  try {
    const { data, error } = await supabase
      .from("enterprises")
      .select("enterprise_id, enterprise_email, enterprise_password")
      .eq("enterprise_email", enterprise_email)
      .single();

    if (error) return res.status(400).json({ error: error.message });

    const validPassword = await bcrypt.compare(
      enterprise_password,
      data.enterprise_password
    );
    if (!validPassword)
      return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      {
        enterprise_id: data.enterprise_id,
        enterprise_email: data.enterprise_email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEnterprise = async (req, res) => {
  const {
    enterprise_name,
    enterprise_cnpj,
    dono_id,
    enterprise_email,
    enterprise_password,
  } = req.body;
  const passHashed = await bcrypt.hash(enterprise_password, 10);
  const { data, error } = await supabase.from("enterprises").insert([
    {
      enterprise_name,
      enterprise_cnpj,
      dono_id,
      enterprise_email,
      enterprise_password: passHashed,
    },
  ]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

exports.getAllEnterprises = async (req, res) => {
  const { data, error } = await supabase.from("enterprises").select("*");

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

exports.getEnterpriseById = async (req, res) => {
  const { enterprise_id } = req.params;
  const { data, error } = await supabase
    .from("enterprises")
    .select("*")
    .eq("enterprise_id", enterprise_id)
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

exports.updateEnterpriseData = async (req, res) => {
  const { enterprise_id } = req.params;
  const {
    enterprise_name,
    enterprise_cnpj,
    dono_id,
    enterprise_email,
    enterprise_password,
  } = req.body;
  const passHashed = await bcrypt.hash(password, 10);
  const { data, error } = await supabase
    .from("enterprises")
    .update({
      enterprise_name,
      enterprise_cnpj,
      dono_id,
      enterprise_email,
      enterprise_password: passHashed,
    })
    .eq("enterprise_id", enterprise_id);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

exports.deleteEnterprise = async (req, res) => {
  const { enterprise_id } = req.params;
  const { data, error } = await supabase
    .from("enterprises")
    .delete()
    .eq("enterprise_id", enterprise_id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
};
