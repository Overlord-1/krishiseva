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
app.use("/api/login", login);
app.use("/api/messages", messages);
app.use("/api/forum", forum);
app.use("/api/gemini", gemini);

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

//NOTE:
// const { OpenAI } = require("openai");
// const openai = new OpenAI({
//   apiKey: "",
// });
// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "what is height of mount everest" }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
// }

// const response = async () => {
//   try {
//     const resp = await openai.createChatCompletion({
//       id: "org-yiPuiDQdBpfT0f7THKJJWoEW",
//       object: "chat.completion",
//       created: 1677858242,
//       model: "text-",
//     });
//     console.log(resp);
//     console.log(resp.data.choices[0].message.content);
//   } catch (err) {
//     console.log(err);
//   }
// };

start();
