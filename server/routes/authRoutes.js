import express from "express";
import { getUser, login, signup } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user-info", verifyToken, getUser);

export default router;
