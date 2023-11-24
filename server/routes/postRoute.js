import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import { createPost } from "../controllers/Post.js";

const router = express.Router();

//Create a post
router.post("/create-post", userAuth, createPost);

// get posts
router.post("/", userAuth, getPosts);
router.post("/:id", userAuth, getPost);

export default router;
