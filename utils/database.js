const mongoose = require("mongoose");

require("dotenv").config();

let isConnected = false; //Tracks connection status

const connectToDB = async () => {
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
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};

// Exporting the connectToDB function as a CommonJS module
module.exports = connectToDB;
