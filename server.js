import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectToDB } from "./utils/database.js";
import Message from "./models/message.js";
import cors from "cors"; //Cross-Origin Resource Sharing

const app = express();
app.use(cors());
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
  },
});

// Async function to connect to the database and handle socket connections
async function initializeSocketServer() {
  try {
    // Connect to the database
    await connectToDB();
    console.log("Connected to the database");

    // Handle Socket.IO events
    io.on("connection", (socket) => {
      console.log("Client Connected");

      socket.on("chatSelected", async (recipientUsername) => {
        try {
          const messages = await Message.find({
            $or: [
              { senderUsername: recipientUsername },
              { recipientUsername: recipientUsername },
            ],
          });
          socket.emit("messages", messages);
        } catch (error) {
          console.error("Error Fetching Messages:", error);
          socket.emit("error", {
            message: "An error occurred while fetching messages.",
            details: error.message,
          });
        }
      });

      socket.on("sendMessage", async (messageData) => {
        try {
          const newMessage = new Message({
            sender: messageData.senderId,
            senderUsername: messageData.senderUsername,
            recipientUsername: messageData.recipientUsername,
            content: messageData.content,
            timestamp: messageData.timestamp,
          });
          await newMessage.save();
          io.emit("newMessage", newMessage);
        } catch (error) {
          console.error("Error saving or sending message:", error);
          socket.emit("error", {
            message: "An error occurred while saving or sending your message.",
            details: error.message,
          });
        }
      });

      socket.on("disconnect", () => {
        console.log("Client Disconnected");
      });
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

// Start the server and initialize Socket.IO
async function startServer() {
  await initializeSocketServer();
  server.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
  });
}

startServer();
