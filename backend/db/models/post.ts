import { model, Schema, Document } from "mongoose";

export type DBPost = {
  text: string;
  authorId: string;
};

const postSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

export const PostModel = model<DBPost & Document>("Post", postSchema);
