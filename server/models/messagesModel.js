import mongoose, { model, Schema } from "mongoose";

const messageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: false,
  },

  messageType: {
    type: String,
    enum: ["text", "file"],
    required: true,
  },

  content: {
    type: String,
    required: function () {
      return this.messageType === "text";
    },
  },

  fileUrl: {
    type: String,
    required: function () {
      return this.messageType === "file";
    },
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = model("Messages", messageSchema);
export default Message;
