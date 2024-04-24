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
    console.log(response.data.predicted_disease);
    const diagnostic = response.data.predicted_disease;
    const isHealthy = diagnostic.indexOf("healthy") !== -1;
    console.log(isHealthy);

    const [crop, disease] = diagnostic.split("___");
    let arr;
    if (isHealthy) {
      //How do we prevent any disease affecting the crop
      const ans1 = await model
        .generateContent(
          `My crop ${crop} is healthy right now. What can I do to keep it that way and maximize its yield at harvest?, answer in around 40 words. start with to maintain healthy conditions:`
        )
        .then((content) => content.response.text());
      console.log(ans1);

      //Are there any factors affecting the nutritional value, such as soil composition or environmental pollution?
      const ans2 = await model
        .generateContent(
          `im a farmer growing ${crop}.Are there any factors affecting the nutritional value, such as soil composition or environmental pollution?answer in around 40 words. start with factors to keep in mind..:`
        )
        .then((content) => content.response.text());
      console.log(ans2);
      //What efforts are being made to minimize environmental impact and promote sustainability?
      const ans3 = await model
        .generateContent(
          `im a farmer and i grow ${crop}. What efforts are being made to minimize environmental impact and promote sustainability? answer in arounf 50 words`
        )
        .then((content) => content.response.text());
      arr = [crop, isHealthy, ans1, ans2, ans3];
    } else {
      //WHAT IS THIS DISEASE
      const ans1 = await model
        .generateContent(
          `im a farmer, im growing ${crop} and it is having the disease ${disease}. what is it.i donot want solutions. answer in around 50 words`
        )
        .then((content) => content.response.text());
      ///NOTE how TO MINIMIZE THE DISEASE
      const ans2 = await model
        .generateContent(
          `im a farmer, im growing ${crop} and it is having the disease ${disease}. what to cure/minimize the damage. answer in around 50 words`
        )
        .then((content) => content.response.text());
      //how to avoid the disease in future
      const ans3 = await model
        .generateContent(
          `im a farmer, im growing ${crop} and it is having the disease ${disease}. what can i do in the future to avoid it?. answer in around 50 words`
        )
        .then((content) => content.response.text());
      console.log(ans1, "ans22\n", ans2, "ans3", ans3);
      arr = [crop, isHealthy, ans1, ans2, ans3];
    }

    res.send(arr);
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
      await model.generateContent(`Considering a region in ${req.params.region},india; provide the most probable soil conditions in JSON format, including: nitrates, phosphates, potassium, temperature (assuming summer), humidity (assuming monsoon season), pH (acknowledging limitations and typical range for ${req.params.region}'s soil , and rainfall in cm(rainfall field must be of yearly rainfall and must be the most accurate) . 
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
