import express from "express";
import { getMessage } from "../controllers/messageController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/get-messages", verifyToken, getMessage);

export default router;
