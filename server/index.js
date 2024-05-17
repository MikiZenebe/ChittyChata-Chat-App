const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running at " + PORT);
  connectDB();
});

app.get("/", (req, res) => {
  res.json({
    message: "Server is running at " + PORT,
  });
});
