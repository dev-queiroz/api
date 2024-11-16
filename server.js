require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRoutes = require("./src/routes/userRoutes");
const postsRoutes = require("./src/routes/postsRoutes");
const commentsRoutes = require("./src/routes/commentsRoutes");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

// Rotas
app.use("/api/users", usersRoutes); // O middleware `authenticateToken` está definido em rotas específicas
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
