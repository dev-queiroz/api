const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const authorize = require("../middlewares/authorization");

router.post("/item/:enterprise_id", authorize(["enterprise"]), itemController.createItem);
router.get("/item/:enterprise_id", authorize(["enterprise", "client"]), itemController.getItemByEnterprise);
router.get("/item/:item_sku", authorize(["enterprise", "client"]), itemController.getItemBySkuEnterprise);
router.put("/item/:item_sku", authorize(["enterprise"]), itemController.updateItemData);
router.delete("/item/:item_sku", authorize(["enterprise"]), itemController.deleteItem);

export default itemRoutes;
