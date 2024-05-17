import express from "express";
import { registerUser } from "../controllers/UserController.js";

const router = express.Router();

//create a user
router.post("/register", registerUser);

export default router;
