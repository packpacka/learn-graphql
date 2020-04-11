import { model, Schema, Document } from "mongoose";

export type DBUser = {
  login: string;
  password: string;
  postIds: string[];
};

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  postIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

export const UserModel = model<DBUser & Document>("User", userSchema);
