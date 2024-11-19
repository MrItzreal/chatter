import { Server } from "socket.io";
import { connectToDB } from "@/utils/database";
import Message from "@models/message";

// Function is called on every request to this route
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); //only GET requests are allowed
  }

  // Connects To DB
  try {
    await connectToDB();
  } catch (error) {
    console.error("Error connecting to database:", error);
    return res.status(500).json({ error: "Database connection error" });
  }

  // Socket.IO Server Init
  const socketServer = res.socket.server; //Exposes underlying HTTP server.
  if (!socketServer.io) {
    console.log("Initializing Socket.IO server...");
    const io = new Server(socketServer, {
      cors: {
        origin: "http://localhost:3000", //Front-end port
        methods: ["GET", "POST"],
      },
    });
    socketServer.io = io;
  }

  // Socket Event Handlers
  io.on("connection", (socket) => {
    console.log("Client Connected");

    socket.on("chatSelected", async (content, recipientUsername) => {
      try {
        const messages = await Message.find({ content });
        socket.emit("messages", { messages, recipientUsername });
      } catch (error) {
        console.error("Error Fetching Messages:", error);

        if (socket) {
          socket.emit("error", {
            message: "An error occurred while fetching messages.",
            details: error.message,
          });
        }
      }
    });

    // sendMessage Event Handler:
    socket.on("sendMessage", async (messageData) => {
      try {
        const newMessage = new Message({
          sender: messageData.senderId,
          recipientUsername: messageData.recipientUsername,
          content: messageData.content,
          timestamp: messageData.timestamp,
        });
        await newMessage.save();
      } catch (error) {
        console.error("Error saving or sending message:", error);

        if (socket) {
          socket.emit("error", {
            message: "An error occurred while saving or sending your message.",
            details: error.message,
          });
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("Client Disconnected");
    });
  });

  // Keep the response pending needed for persistent Socket.IO connections.
  res.end();
}
