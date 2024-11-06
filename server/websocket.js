import { Server } from "socket.io";

const PORT = process.env.PORT || 8080;

const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // Handle incoming messages
  socket.on("chat message", (message) => {
    // Log the received message (for debugging)
    console.log(`Received message:`, message);

    // Ensure the message has the expected structure
    if (message.sender && message.content && message.timestamp) {
      // Broadcast message to all connected clients
      io.emit("chat message", message);
    } else {
      console.error("Received malformed message:", message);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

console.log(`WebSocket server started on port ${PORT}`);
