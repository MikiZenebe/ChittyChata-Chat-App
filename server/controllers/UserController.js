import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

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

    return response.status(201).json({
      message: "User created successfully",
      data: newUser,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};
