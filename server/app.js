require("dotenv").config();
const connectDB = require("./db/connect");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");

const url = process.env.MONG_URI;
const port = 4000;

const app = express();
app.use(cors()); // CORS middleware

// Middleware for parsing JSON request bodies
app.use(express.json());

// Routes
const login = require("./routes/login");
app.use("/api", login);

// Create HTTP server
const server = createServer(app);

// Initialize Socket.io with custom path
const io = new Server(server, {
  cors: {
    origin: "*", // Update this to match your frontend URL
    methods: ["GET", "POSsT"],
    credentials: true,
  },
  // path: "/socket.io", // Specify a custom path for Socket.io requests
});

// Socket.io event handlers
io.on("connection", (socket) => {
  console.log("User connected, ID:", socket.id);
  socket.on("mes", (e) => {
    console.log(e);
  });

  socket.broadcast.emit("welcome", `${socket.id} joined the server`);

  socket.on("message", ({ message, room }) => {
    console.log("socket.on message->", message, "room->", room);
    io.to(room).emit("recieve-message", message); // Send the message to all clients in the room
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

// Start the server
const start = async () => {
  try {
    await connectDB(url);
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err.message);
  }
};

start();
