import jwt from "jsonwebtoken";

const genToken = (userId, res) => {
  const maxAge = 3 * 24 * 60 * 60 * 1000;
  const token = jwt.sign({ userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: true,
  });
};

export default genToken;
