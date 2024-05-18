import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI is not defined");
}

const connection = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log("Error in connection to MongoDB", (error as Error).message);
  }
};

export default connection;
