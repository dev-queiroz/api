import supabase from "../services/supabaseClient.js";

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  if (!title || !content)
    return res.status(400).json({ error: "Title and content are required" });

  const { error } = await supabase
    .from("posts")
    .insert({ title, content, user_id: userId });

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json({ message: "Post created successfully" });
};

export const getUserPosts = async (req, res) => {
  const userId = req.user.id;

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", userId);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(posts);
};
