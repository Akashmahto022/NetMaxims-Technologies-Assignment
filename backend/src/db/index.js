import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully", connectionInstance.connection.host);
  } catch (error) {
    console.log("Error in connected with MongoDB", error);
  }
};

export default connectDB;
