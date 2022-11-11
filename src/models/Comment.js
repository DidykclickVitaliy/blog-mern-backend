import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
      require: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Comment", CommentSchema);
