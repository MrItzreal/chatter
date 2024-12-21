const mongoose = require("mongoose");

// Destructure Schema, model, and models from mongoose
const { Schema, model, models } = mongoose;

// Define your schema for the Message model
const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId, // Unique ID of the user who sent the message
      ref: "User", // Reference to the User model
      required: true,
    },
    senderUsername: {
      type: String,
      required: true,
    },
    recipientUsername: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create or use the existing Message model
const Message = models.Message || model("Message", MessageSchema);

module.exports = Message;
