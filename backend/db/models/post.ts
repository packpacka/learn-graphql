import { model, Schema, Document } from "mongoose";

const postSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});

export const Post = model<{ text: string } & Document>("Post", postSchema);
