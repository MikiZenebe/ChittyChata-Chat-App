import User from "../models/User";
import { compareString, createJWT, hashString } from "../utils/index";
import { sendVerificationEmail } from "../utils/sendEmail";

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
    sendVerificationEmail(user, res);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //Validation
    if (!email || !password) {
      next("Please Provide User Credentials");
    }

    //find a user by email
    const user = await User.findOne({ email }).select("+password").populate({
      path: "friends",
      select: "fullName location profileUrl -password",
    });

    if (!user) {
      next("Invalid email or password");
      return;
    }

    if (!user?.verified) {
      next(
        "User email is not verified. Check your email account and verify your email"
      );
      return;
    }

    //Compare Password
    const isMatch = await compareString(password, user?.password);

    if (!isMatch) {
      next("Invalid email or password");
      return;
    }

    //remove the password from the user object for security reasons.
    user.password = undefined;

    const token = createJWT(user?._id);

    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
