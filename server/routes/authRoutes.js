import express from "express";
import {
  addProfileImg,
  getUser,
  login,
  logout,
  removeProfileImg,
  signup,
  updateProfile,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "uploads/profiles/" });

router.post("/signup", signup);
router.post("/login", login);
router.get("/user-info", verifyToken, getUser);
router.post("/update-profile", verifyToken, updateProfile);
router.post(
  "/add-profile-img",
  verifyToken,
  upload.single("profile-image"),
  addProfileImg
);
router.delete("/remove-profile-img", verifyToken, removeProfileImg);
router.post("/logout", logout);

export default router;
