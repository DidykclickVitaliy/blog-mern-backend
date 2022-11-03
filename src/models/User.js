import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    passwordHash: { type: String, require: true },
    avatarUrl: String,
  },
  { timestamps: true }
);

export default model("User", UserSchema);
