const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  email: String,
  content: String,
  image: String,
  time: String,
});
const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
