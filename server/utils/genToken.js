import jwt from "jsonwebtoken";

const genToken = (email, userId) => {
  const maxAge = 3 * 24 * 60 * 60 * 1000;
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
    secure: true,
    sameSite: "None",
  });
};

export default genToken;
