require("dotenv").config();
import express from "express";
import cors from "cors";
import "body-parser";
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

import enterpriseRoutes from "./src/routes/enterpriseRoutes.js";
import itemRoutes from "./src/routes/itemRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import authenticateToken from "./src/middlewares/auth.js";
import bodyParser from "body-parser";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", authenticateToken, enterpriseRoutes);
app.use("/api", authenticateToken, itemRoutes);
app.use("/api", authenticateToken, userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
