const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.post("/item/:enterprise_id", itemController.createItem);
router.get("/item/:enterprise_id", itemController.getItemByEnterprise);
router.get("/item/:item_sku", itemController.getItemBySku);
router.put("/item/:item_sku", itemController.updateItemData);
router.delete("/item/:item_sku", itemController.deleteItem);
