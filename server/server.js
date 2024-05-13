const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/userRoutes");
const cloudinary = require("cloudinary").v2;

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

//Connect to mongodb
const dbConnect = async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database is running");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//API
app.use("/api/auth", authRoutes);

//Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
  dbConnect();
});
