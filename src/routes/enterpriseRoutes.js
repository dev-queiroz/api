const express = require("express");
const router = express.Router();
const enterpriseController = require("../controllers/enterpriseController");

router.post("/enterprise/login", enterpriseController.loginEnterprise);
router.post("/enterprise", enterpriseController.createEnterprise);
router.get("/enterprise", enterpriseController.getAllEnterprises);
router.get("/enterprise/:enterprise_id", enterpriseController.getEnterpriseById);
router.put("/enterprise/:enterprise_id", enterpriseController.updateEnterpriseData);
router.delete("/enterprise/:enterprise_id", enterpriseController.deleteEnterprise);

export default enterpriseRoutes;