import User from "../models/userModel.js";
import genToken from "../utils/genToken.js";

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
