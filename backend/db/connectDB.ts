import mongoose from "mongoose";

const connectionString =
  "mongodb+srv://cluster0-xyiag.mongodb.net/";

export const connectDB = async () => {
  await mongoose.connect(connectionString, {
    dbName: 'test',
    user: 'DBAdmin',
    pass: '1e0JQ6cBLrk8MTnP',
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};
