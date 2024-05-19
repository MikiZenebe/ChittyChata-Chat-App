import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import getUserDetailsFromToken from "../helpers/getUserDetailFromToken.js";

export const registerUser = async (req, res) => {
  try {
    const { username, name, email, password, profile_pic } = req.body;

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        message: "Email already exits",
        error: true,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      profile_pic,
      password: hashpassword,
    });
    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};
export const userDetails = async (req, res) => {
  try {
    const token = req.cookies.token || "";
    const user = await getUserDetailsFromToken(token); //Pass the token as a param

    return res.status(200).json({
      message: "user details",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};
export const userLogout = async (req, res) => {
  try {
    const cookieOptions = {
      http: true,
      secure: true,
    };

    return res.cookie("token", "", cookieOptions).status(200).json({
      message: "session out",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    const token = req.cookies.token || "";

    const user = await getUserDetailsFromToken(token);

    const { username, name, email, profile_pic } = req.body;

    const updateUser = await User.updateOne(
      { _id: user._id },
      {
        username,
        name,
        email,
        profile_pic,
      }
    );

    const userInfo = await User.findById(user?._id);

    return res.json({
      message: "user update successfully",
      data: userInfo,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};
