import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export const PostModel = mongoose.model("Post", postSchema);