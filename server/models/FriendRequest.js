import mongoose, { Schema } from "mongoose";

const RequestSchema = Schema(
  {
    requestTo: { type: Schema.Types.ObjectId, ref: "Users" },
    requestFrom: { type: Schema.Types.ObjectId, ref: "Users" },
    requestStatus: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const FriendRequest = mongoose.model("FriendRequest", RequestSchema);

export default FriendRequest;
