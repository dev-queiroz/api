require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

const enterpriseRoutes = require("./src/routes/enterpriseRoutes");
const itemRoutes = require("./src/routes/itemRoutes");
const userRoutes = require("./src/routes/userRoutes");
const authenticateToken = require("./src/middlewares/auth");

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
