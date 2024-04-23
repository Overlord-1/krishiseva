const multer = require("multer");
const axios = require("axios");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "ai");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    // cb(null, `file.${ext}`);
    cb(null, `file.jpeg`);
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
const predict = async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      req.body
    );
    res.send(response.data);
  } catch (error) {
    console.error("Error predicting:", error);
    res.status(500).send("Internal Server Error");
  }
};
const model = require("../services/gemini.js");

const test1 = async (req, res) => {
  try {
    const result =
      await model.generateContent(`Considering a region in ${req.params.region},india; provide the most probable soil conditions in JSON format, including: nitrates, phosphates, potassium, temperature (assuming summer), humidity (assuming monsoon season), pH (acknowledging limitations and typical range for ${req.params.region}'s soil , and rainfall (recognizing it might be a drier than usual year). 
      donot return anything else.i want numbers only, even they maynot be completely verifed, donot include any comments or other information.your answer should start with{ and end with}. put your result in "", donot use ''or any other symbol., DONOT GIVE N/A`);
    const ans = JSON.parse(result.response.text());

    //NOTE

    const convertedData = Object.entries(ans).reduce((acc, [key, value]) => {
      // Convert all values to strings
      const stringValue = value.toString();
      // Change the key 'pH' to 'ph'
      const newKey = key === "pH" ? "ph" : key;
      // Add the new key-value pair to the accumulator
      acc[newKey] = stringValue;
      return acc;
    }, {});

    console.log(convertedData);

    //NOTE

    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      convertedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    // console.error("Error predicting:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { recognizeDisease, upload, predict, test1 };
