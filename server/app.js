require("dotenv").config();
const connectDB = require("./db/connect");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");
const url = process.env.MONG_URI;

const app = express();
app.use(cors());

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
