import mongoose, { model, Schema } from "mongoose";

const messageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },

  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: false,
  },

  message: {
    type: String,
    enum: ["text", "file"],
    required: true,
  },

  content: {
    type: String,
    required: function () {
      return this.message === "text";
    },
  },

  fileUrl: {
    type: String,
    required: function () {
      return this.message === "file";
    },
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Message = model("Messages", messageSchema);
export default Message;
