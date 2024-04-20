const multer = require("multer");
const axios = require("axios");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "ai");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `file.${ext}`);
  },
});
const upload = multer({ storage: multerStorage });

const recognizeDisease = async (req, res) => {
  try {
    // await fs.unlink(existingImage.image);
    console.log("uploaded image");
    const response = await axios.get("http://127.0.0.1:5000/recognize");
    res.send(response.data);
  } catch (error) {
    // Handle errors
    console.error("Error uploading image:", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = { recognizeDisease, upload };
