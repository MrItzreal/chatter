import { Server } from "socket.io";
import { connectToDB } from "@/utils/database";
import Message from "@models/message";

// Function is called on every request to this route
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); //only GET requests are allowed
  }

  // Connects To DB
  await connectToDB();

  // Socket.IO Server Init
  const socketServer = res.socket.server;
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

    socket.on("chatSelected", async (chatId) => {
      try {
        const messages = await Message.find({ chatId });
        socket.emit("messages", messages);
      } catch (error) {
        console.error("Error Fetching Messages:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client Disconnected");
    });
  });

  // Keep the response pending
  res.end();
}
