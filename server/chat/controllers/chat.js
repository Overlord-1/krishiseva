const Message = require("../models/Message");

const createMessage = async (obj, socket) => {
  try {
    console.log(obj);
    const message = await Message.create(obj);
    console.log(message);
  } catch (err) {
    console.log(err);
    // Emit an error event to the frontend
    socket.emit("error", { message: "Failed to create message" });
  }
};

module.exports = { createMessage };
