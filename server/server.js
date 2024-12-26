const express = require("express");
const http = require("http");
const cors = require("cors");
const connectToDB = require("../utils/database.js");
const Message = require("../models/message.js");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PATCH"],
  credentials: true,
};

// Apply CORS to Express app
app.use(cors(corsOptions));
app.use(express.json());

const server = http.createServer(app);

// Initialize Socket.IO server, using the same CORS options
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: corsOptions,
});

// This Map tracks active socket connections for each username
const userSockets = new Map();

// Allows retrieving a specific user's socket ID
function getUserSocketId(username) {
  return userSockets.get(username);
}

// Async function to connect to the database and handle socket connections
async function initializeSocketServer() {
  try {
    // Connect to the database
    await connectToDB();
    console.log("Connected to the database");

    // Handle Socket.IO events
    io.on("connection", (socket) => {
      // Register user's socket connection
      socket.on("register", (username) => {
        userSockets.set(username, socket.id);
        console.log(`User: ${username} Connected`);
        console.log(`User: ${username} registered with socket ID ${socket.id}`);
      });

      socket.on("fetchConversation", async (data) => {
        try {
          const { currentUsername, recipientUsername } = data;
          const messages = await Message.find({
            $or: [
              {
                // A to B
                senderUsername: currentUsername,
                recipientUsername: recipientUsername,
              },
              {
                // B to A
                senderUsername: recipientUsername,
                recipientUsername: currentUsername,
              },
            ],
          }).sort({ timestamp: 1 }); // Sort messages chronologically

          // Emit only to the socket that requested
          socket.emit("conversationMessages", messages);
        } catch (error) {
          console.error("Error Fetching Messages:", error);
          socket.emit("error", {
            message: "An error occurred while fetching messages.",
            details: error.message,
          });
        }
      });

      // Send and save message
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

          // Broadcast to both sender and recipient
          const recipientSocketId = getUserSocketId(
            messageData.recipientUsername
          );
          const senderSocketId = getUserSocketId(messageData.senderUsername);

          if (recipientSocketId) {
            io.to(recipientSocketId).emit("newMessage", newMessage);
          }
          if (senderSocketId) {
            io.to(senderSocketId).emit("newMessage", newMessage);
          }
        } catch (error) {
          console.error("Error saving or sending message:", error);
          socket.emit("error", {
            message: "An error occurred while saving or sending your message.",
            details: error.message,
          });
        }
      });

      socket.on("disconnect", () => {
        // Remove the socket from the userSockets map when disconnected
        for (const [username, socketId] of userSockets.entries()) {
          if (socketId === socket.id) {
            userSockets.delete(username);
            console.log(`User: ${username} Disconnected`);
            break;
          }
        }
      });
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

// Start the server and initialize Socket.IO
async function startServer() {
  try {
    await initializeSocketServer();
    server.listen(3001, () => {
      console.log("Server is running on http://localhost:3001");
    });

    server.on("error", (error) => {
      console.error("Server error:", error);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
