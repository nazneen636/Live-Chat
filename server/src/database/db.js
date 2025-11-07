import mongoose from "mongoose";
import "dotenv/config";

export const connectDatabase = async () => {
  try {
    const data = await mongoose.connect(`${process.env.MONGODB_URL}livechat`);
    console.log(`database connected successfully ${data.connection.host}`);
  } catch (error) {
    console.log("database connect failed", error);
  }
};
