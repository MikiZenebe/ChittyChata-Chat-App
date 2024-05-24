import express from "express";
import { Server } from "socket.io";
import http from "http";
import getUserDetailsFromToken from "../helpers/getUserDetailFromToken.js";

const app = express();

/* Socket Connection */
/***socket connection */
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

//Online user
const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("connectd user", socket.id);

  //Get the token
  const token = socket.handshake.auth.token;

  //current user
  const user = await getUserDetailsFromToken(token);

  //create a room
  socket.join(user?._id);
  onlineUser.add(user?._id);

  io.emit("onlineUser", Array.from(onlineUser));

  //disconnect
  socket.on("disconnect", () => {
    onlineUser.delete(user._id);
    console.log("disconnectd user", socket.id);
  });
});

export { app, server };
