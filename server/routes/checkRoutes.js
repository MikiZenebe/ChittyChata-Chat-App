import express from "express";
import { checkEmail, checkPassword } from "../controllers/checkController.js";

const router = express.Router();

//check email & password
router.post("/email", checkEmail);
router.post("/password", checkPassword);

export default router;
