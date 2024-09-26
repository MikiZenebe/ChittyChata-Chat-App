import express from "express";
import {
  contactList,
  searchContacts,
} from "../controllers/contactController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/search", verifyToken, searchContacts);
router.get("/get-contactList", verifyToken, contactList);

export default router;
