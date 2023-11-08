import mongoose, { Schema } from "mongoose";

//schema
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "First Name is Required!"],
    },

    username: {
      type: String,
      required: [true, " Username is Required!"],
      unique: true,
    },

    email: {
      type: String,
      required: [true, " Email is Required!"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is Required!"],
      minlength: [6, "Password length should be greater than 6 character"],
      select: true,
    },
    location: { type: String },
    profileUrl: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    views: [{ type: String }],
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", UserSchema);

export default Users;
