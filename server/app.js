require("dotenv").config();
const connectDB = require("./db/connect");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");
const chat = require("./chat/chat.js");

const url = process.env.MONG_URI;
const port = 4000;

const app = express();
app.use(cors()); // CORS middleware

// Middleware for parsing JSON request bodies
app.use(express.json());

// Routes
const login = require("./routes/login");
const e = require("express");
app.use("/api", login);

// Create HTTP server
const server = chat(app);

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
