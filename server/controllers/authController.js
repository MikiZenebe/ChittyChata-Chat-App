import User from "../models/userModel.js";
import genToken from "../utils/genToken.js";
import bcrypt from "bcryptjs";
import { renameSync, unlinkSync } from "node:fs";

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email & Password is required");
    }

    const user = new User({
      email,
      password,
    });

    if (user) {
      genToken(user._id, res);
      await user.save();
      res.status(201).json({
        user,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email & Password is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User with the given email not found");
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).send("Password is incorrect");
    }

    genToken(user._id, res);
    res.status(200).json({ user });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).send("User with the given id is not found");
    }

    return res.status(200).json(userData);
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server error");
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req;
    const { firstName, lastName, color } = req.body;
    if (!firstName || !lastName) {
      return res.status(404).send("Firstname, lastname & color is required");
    }
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        color,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json(userData);
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server error");
  }
};

export const addProfileImg = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required");
    }

    const date = Date.now();
    let fileName = "uploads/" + date + req.file.originalname;
    renameSync(req.file.path, fileName);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { image: fileName },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      image: updatedUser.image,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal server error");
  }
};

export const removeProfileImg = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).send("User not found");
    }

    if (user.image) {
      unlinkSync(user.image);
    }
    user.image = null;
    await user.save();

    return res.status(200).json({
      msg: "Image removed",
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal server error");
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0, secure: true, sameSite: "None" });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
