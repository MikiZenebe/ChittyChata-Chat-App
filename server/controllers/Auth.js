import User from "../models/User";
import { hashString } from "../utils/index";

export const register = async (req, res, next) => {
  const { fullName, username, email, password } = req.body;

  //Validate fields
  if (!fullName || username || email || password) {
    next("Provide Required Fields");
    return;
  }

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      next("Email Address already exists");
      return;
    }

    const hashedPassword = await hashString(password);

    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    //send email verification to user
    // sendVerificationEmail(user, res);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
