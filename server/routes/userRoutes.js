import express from "express";
import {
  registerUser,
  userDetails,
  userLogout,
} from "../controllers/UserController.js";

const router = express.Router();

//create a user
router.post("/register", registerUser);

//login user details
router.get("/user-details", userDetails);

//logout user
router.get("/logout", userLogout);

export default router;
