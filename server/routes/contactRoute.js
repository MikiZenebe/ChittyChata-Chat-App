import express from "express";
import { searchContacts } from "../controllers/contactController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/search", verifyToken, searchContacts);

export default router;
