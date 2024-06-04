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
  socket.join(user?._id?.toString());
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

    //Previous Message
    const getConversation = await ConversationModel.findOne({
      $or: [
        { sender: user?._id, receiver: userId },
        { sender: userId, receiver: user?._id },
      ],
    })
      .populate("messages")
      .sort({ updatedAt: -1 });

    socket.emit("message", getConversation?.messages || []);
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
  });

  //Sidebar
  socket.on("sidebar", async (currentUserId) => {
    const currentUserConv = await ConversationModel.find({
      $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    })
      .sort({ updatedAt: -1 })
      .populate("messages")
      .populate("sender")
      .populate("receiver");

    const conversation = currentUserConv.map((conv) => {
      const countUnseenMsg = conv.messages.reduce(
        (prev, curr) => prev + (curr.seen ? 0 : 1),
        0
      );

      return {
        _id: conv._id,
        sender: conv.sender,
        receiver: conv.receiver,
        unseenMsg: countUnseenMsg,
        lastMsg: conv.messages[conv.messages.length - 1],
      };
    });

    socket.emit("conversation", conversation);
  });

  //disconnect
  socket.on("disconnect", () => {
    onlineUser.delete(user._id);
    console.log("disconnectd user", socket.id);
  });
});

export { app, server };
