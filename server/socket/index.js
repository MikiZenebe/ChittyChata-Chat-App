import express from "express";
import { Server } from "socket.io";
import http from "http";
import getUserDetailsFromToken from "../helpers/getUserDetailFromToken.js";
import User from "../models/UserModel.js";
import {
  ConversationModel,
  MessageModel,
} from "../models/ConversationModel.js";

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
  onlineUser.add(user?._id?.toString());

  io.emit("onlineUser", Array.from(onlineUser));

  socket.on("message-page", async (userId) => {
    console.log("userId", userId);
    const userDetails = await User.findById(userId).select("-password");

    const payload = {
      _id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
      profile_pic: userDetails.profile_pic,
      online: onlineUser.has(userId),
    };

    socket.emit("message-user", payload);
  });

  //new message
  socket.on("new message", async (data) => {
    //Check conversation is avaliable both user
    const conversation = await ConversationModel.findOne({
      $or: [
        {
          sender: data?.sender,
          receiver: data?.receiver,
        },
        {
          sender: data?.receiver,
          receiver: data?.sender,
        },
      ],
    });

    //if conversation not avaliable
    if (!conversation) {
      const createConversation = await ConversationModel({
        sender: data?.sender,
        receiver: data?.receiver,
      });
      conversation = await createConversation.save();
    }

    const message = new MessageModel({
      text: data.text,
      imageUrl: data.imageUrl,
      videoUrl: data.videoUrl,
      msgByUserId: data?.msgByUserId,
    });
    const saveMessage = await message.save();

    const updateConversation = await ConversationModel.updateOne(
      { _id: conversation?._id },
      {
        $push: {
          messages: saveMessage?._id,
        },
      }
    );

    // const getConversation = await ConversationModel.findOne({
    //   $or: [
    //     {
    //       sender: data?.sender,
    //       receiver: data?.receiver,
    //     },
    //     {
    //       sender: data?.receiver,
    //       receiver: data?.sender,
    //     },
    //   ],
    // })
    //   .populate("messages")
    //   .sort({ updatedAt: -1 });

    // console.log(getConversation);
  });

  //disconnect
  socket.on("disconnect", () => {
    onlineUser.delete(user._id);
    console.log("disconnectd user", socket.id);
  });
});

export { app, server };
