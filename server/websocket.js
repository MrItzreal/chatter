import { Server } from "socket.io";

const PORT = process.env.PORT || 8080;

const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:3001",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // Handle incoming messages
  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast message to all connected clients
    io.emit("message", `Roger that: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

console.log(`WebSocket server started on port ${PORT}`);
