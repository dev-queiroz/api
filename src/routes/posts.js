import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { createPost, getUserPosts } from "../controllers/postsController.js";

const router = express.Router();

router.post("/", authenticate, createPost);
router.get("/", authenticate, getUserPosts);

export default router;
