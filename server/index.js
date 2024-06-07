import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import checkRoutes from "./routes/checkRoutes.js";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://chitty-chata.vercel.app/",
    credentials: true,
  })
);

//api endpoints
app.use("/api", userRoutes);
app.use("/api", checkRoutes);

server.listen(() => {
  connectDB();
});

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});
