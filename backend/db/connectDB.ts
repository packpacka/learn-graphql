import mongoose from "mongoose";

const connectionString =
  "mongodb+srv://DBAdmin:Jt0PNvU6AerBsiBn@cluster0-xyiag.mongodb.net/test?retryWrites=true&w=majority";

export const connectDB = async () => {
  await mongoose.connect(connectionString);
};
