import { config } from "dotenv";
const { createClient } = "@supabase/supabase-js";
config("dotenv");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default supabase;
