import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getMessage, uploadFile } from "../controllers/messageController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads" });

router.post("/get-messages", verifyToken, getMessage);
router.post("/upload-file", verifyToken, upload.single("file"), uploadFile);

export default router;
