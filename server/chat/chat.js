const { Server } = require("socket.io");
const { createServer } = require("http");
const { createMessage, getMessages } = require("./controllers/chat");
const chat = function (app) {
  const server = createServer(app);

  // Initialize Socket.io with custom path
  const io = new Server(server, {
    cors: {
      origin: "*", // Update this to match your frontend URL
      methods: ["GET", "POST"],
      credentials: true,
    },
    path: "/socket.io", // Specify a custom path for Socket.io requests
  });

  // Socket.io event handlers
  io.on("connection", (socket) => {
    console.log("User connected, ID:", socket.id);

    socket.broadcast.emit("welcome", `${socket.id} joined the server`);
    /*     const allMessages = getMessages();
    allMessages.then((messages) => {
      messages.forEach((message) => {
        socket.emit("recvMessage", {
          text: message.text,
          Img: message.Img,
          email: message.email,
        });
      });
    }); */
    socket.on("message", ({ text, Img, email,time }) => {
      console.log(text, Img, email);
      createMessage({ text, Img, email, time });
      socket.broadcast.emit("recvMessage", {
        text: text,
        Img: Img,
        email: email,
        time: time,
      });
    });
  });

  // Return the io instance instead of the server instance
  return server;
};

module.exports = chat;
