import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

//api endpoints
app.use("/api", userRoutes);

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
