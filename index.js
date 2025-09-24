const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// MongoDB connection (free cluster)

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data); // broadcast message
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server running on port ${port}`));
