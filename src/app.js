import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
