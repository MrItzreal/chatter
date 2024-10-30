import { Server } from "socket.io";

const PORT = process.env.PORT || 8080;
const io = new Server(PORT);

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    io.emit("message", `Roger that: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

console.log(`WebSocket server started on port ${PORT}`);
