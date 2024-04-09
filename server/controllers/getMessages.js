const Message = require("../chat/models/Message");
const getMessages = async (req, res) => {
  try {
    const allMessages = await Message.find({});
    res.send(allMessages);
  } catch (err) {
    return null;
  }
};
module.exports = { getMessages };
