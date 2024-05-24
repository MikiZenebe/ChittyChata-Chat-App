import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import checkRoutes from "./routes/checkRoutes.js";
import { app, server } from "./socket/index.js";

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

//api endpoints
app.use("/api", userRoutes);
app.use("/api", checkRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Server running at " + PORT);
  connectDB();
});

app.get("/", (req, res) => {
  res.json({
    message: "Server is running at " + PORT,
  });
});
