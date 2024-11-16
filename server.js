require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRoutes = require("./src/routes/userRoutes");
const postsRoutes = require("./src/routes/postsRoutes");

const authenticateToken = require("./src/middlewares/auth");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/api/users", authenticateToken, usersRoutes);
app.use("/api/posts", authenticateToken, postsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
