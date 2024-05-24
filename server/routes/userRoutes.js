import express from "express";
import {
  registerUser,
  searchUser,
  updateUser,
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

//update user details
router.post("/update-user", updateUser);

//search user
router.post("/search-user", searchUser);

export default router;
