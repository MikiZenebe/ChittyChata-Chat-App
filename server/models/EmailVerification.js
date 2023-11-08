import mongoose, { Schema } from "mongoose";

const EmailVerificationSchema = Schema({
  userId: String,
  token: String,
  createdAt: Date,
  expiresAt: Date,
});

const Verification = mongoose.model("Verification", EmailVerificationSchema);

export default Verification;
