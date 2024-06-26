require("dotenv").config();
const connectDB = require("./services/connect");
const express = require("express");
const cors = require("cors");
const chat = require("./chat/chat.js");
const url = process.env.MONG_URI;
const port = 4000;

const app = express();
app.use(cors()); // CORS middleware

// Middleware for parsing JSON request bodies
app.use(express.json());

// Routes
const login = require("./routes/login");
const messages = require("./routes/getMessages");
const forum = require("./routes/forum");
const gemini = require("./routes/gemini");
const ai = require("./routes/ai");
app.use("/api/login", login);
app.use("/api/messages", messages);
app.use("/api/forum", forum);
app.use("/api/gemini", gemini);
app.use("/api/ai", ai);

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
