import mongoose from "mongoose";

let isConnected = false; //Tracks connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); //Sets mongoose options

  if (isConnected) {
    console.log("Mongo is already connected!");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "chatter",
    });

    isConnected = true;
    console.log("Mongo is connected!");
  } catch (error) {
    console.log("Something went wrong when connecting to MongoDB");
  }
};
