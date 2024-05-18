import express from "express";
import { registerUser, userDetails } from "../controllers/UserController.js";

const router = express.Router();

//create a user
router.post("/register", registerUser);

//login user details
router.get("/user-details", userDetails);

export default router;
