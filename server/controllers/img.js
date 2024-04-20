const multer = require("multer");
const fs = require("fs");
const Image = require("../models/Image");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `file-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: multerStorage });
const uploadImage = async (req, res) => {
  try {
    // Create a new instance of the Image model
    const newImage = new Image({
      image: req.file.path, // Save the file path to the image field
      parentElement: req.body.parentElement,
    });

    // Save the new image to the database
    await newImage.save();

    // Send a success response
    res.send("File successfully uploaded and saved to database.");
  } catch (error) {
    // Handle errors
    console.error("Error uploading image:", error);
    res.status(500).send("Internal Server Error");
  }
};
const getAllImgs = async (req, res) => {
  try {
    // Fetch all image documents from the database
    const allImages = await Image.find();
    const path = allImages[0].image;

    // Set the appropriate Content-Type header based on file extension
    const contentType = "image/" + path.split(".").pop();
    res.setHeader("Content-Type", contentType);

    // Stream the file directly to the response
    const stream = fs.createReadStream(path);
    stream.pipe(res);
  } catch (error) {
    // Handle errors
    console.error("Error fetching images:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getIMG = async (req, res) => {
  try {
    const image = await Image.findOne({
      parentElement: req.params.parentElement,
    });
    const path = image.image;

    // Set the appropriate Content-Type header based on file extension
    const contentType = "image/" + path.split(".").pop();
    res.setHeader("Content-Type", contentType);

    // Stream the file directly to the response
    const stream = fs.createReadStream(path);
    stream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err.message || "Internal Server Error" });
  }
};
module.exports = { upload, uploadImage, getAllImgs, multerStorage, getIMG };
