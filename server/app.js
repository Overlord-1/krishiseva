require("dotenv").config();
const connectDB = require("./db/connect");
const express = require("express");
const cors = require("cors");
const app = express();
// app.use(cors());
const { Server } = require("socket.io");
const { createServer } = require("http");
const url = process.env.MONG_URI;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
  path: "/socket.io", // Specify a custom path for Socket.io requests
});

io.on("connection", (socket) => {
  console.log("User connected, ID:", socket.id);

  socket.broadcast.emit("welcome", `${socket.id} joined the server`);

  socket.on("message", ({ message, room }) => {
    console.log("socket.on message->", message, "room->", room);
    io.to(room).emit("recieve-message", message); // Send the message to all clients in the room
  });

  socket.on("join-room", (room) => {
    console.log(`User ${socket.id} joined room ${room}`);
    socket.join(room); // Join the room specified in the payload
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

const login = require("./routes/login");
const port = 4000;

app.use(express.json());
app.use("/api", login);

const start = async () => {
  try {
    await connectDB(url);
    app.listen(port, () => {
      console.log(`listening to port ${port} `);
    });
  } catch (err) {
    console.log(err);
  }
};

start();

/* const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const port = 8000;

// Define your routes and middleware here
// For example:
// app.use(express.json()); // Middleware for parsing JSON

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err.message);
  }
};

start();
 */
