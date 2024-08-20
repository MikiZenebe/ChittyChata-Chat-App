import User from "../models/userModel.js";
import genToken from "../utils/genToken.js";

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email & Password is required");
    }

    const user = await User.create({ email, password });
    res.cookie("jwt", genToken(email, user._id));
    return res.status(201).json({ user: { id: user._id, email: user.email } });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error");
  }
};
