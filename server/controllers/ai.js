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
      // arr = [crop, isHealthy, ans1, ans2, ans3];
      arr = {
        crop: crop,
        isHealthy: isHealthy,
        ans1: ans1,
        ans2: ans2,
        ans3: ans3,
      };
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
      arr = {
        crop: crop,
        isHealthy: isHealthy,
        ans1: ans1,
        ans2: ans2,
        ans3: ans3,
      };
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
    console.log(req.params);
    const latLng = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${req.params.region}&appid=30597233454e23d736adf43c366381c1`
    );
    lat = latLng.data[0].lat;
    lon = latLng.data[0].lon;
    console.log(lat, lon);

    //NOTE uncommment this for gemini
    /*
    const result =
      await model.generateContent(`Considering a region in ${req.params.region},india; provide the most probable soil conditions in JSON format, including: nitrates, phosphates, potassium, temperature (assuming summer), humidity (assuming monsoon season), pH (acknowledging limitations and typical range for ${req.params.region}'s soil , and rainfall in cm(rainfall field must be of yearly rainfall and must be the most accurate) .
      donot return anything else.i want numbers only, even they maynot be completely verifed, donot include any comments or other information.your answer should start with{ and end with}. put your result in "", donot use ''or any other symbol., DONOT GIVE N/A or null`);
    // const result =
    //   await model.generateContent(`Considering a region in india with latitude:${lat} and longitude:${lon}; provide the  soil conditions in JSON format, including: nitrates, phosphates, potassium, temperature (assuming summer), humidity (assuming monsoon season), pH (acknowledging limitations and typical range for ${req.params.region}'s soil , and rainfall in cm(rainfall field must be of yearly rainfall and must be the most accurate) .
    // donot return anything else.i want numbers only, even they maynot be completely verifed, donot include any comments or other information.your answer should start with{ and end with}. put your result in "", donot use ''or any other symbol., DONOT GIVE N/Aor null or any other value.`);
    const ans = JSON.parse(result.response.text());
    console.log("ans->", ans);
     */
    /* 
    const options = {
      method: "GET",
      url: "https://meteostat.p.rapidapi.com/point/normals",
      params: {
        lat: `${lat}`,
        lon: `${lon}`,
        alt: "26",
        start: "1961",
        end: "1990",
      },
      headers: {
        "X-RapidAPI-Key": "f92b611511msh60acd07c524ea52p112782jsn34f206cfbaf1",
        "X-RapidAPI-Host": "meteostat.p.rapidapi.com",
      },
    };

    const respo = await axios.request(options); */

    const options = {
      method: "GET",
      url: "https://meteostat.p.rapidapi.com/point/normals",
      params: {
        lat: `${lat}`,
        lon: `${lon}`,
        alt: "26",
        start: "1961",
        end: "1990",
      },
      headers: {
        "X-RapidAPI-Key": "f92b611511msh60acd07c524ea52p112782jsn34f206cfbaf1",
        "X-RapidAPI-Host": "meteostat.p.rapidapi.com",
      },
    };

    const [temperature, rainfall] = await axios.request(options).then((res) => {
      return [
        res.data.data.reduce((acc, curr) => acc + curr.tavg, 0) / 12,
        res.data.data.reduce((arr, curr) => arr + curr.prcp, 0) / 12,
      ];
    });
    // console.log("t%r", temperature, rainfall);

    // console.log(respo.data.data[0].prcp);
    // console.log(respo.data.data[0]);
    // let rainfall = 0;
    // respo.data.data.forEach((element) => {
    //   rainfall += element.prcp;
    // });
    console.log(temperature);
    const [temp, humidity] = await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?appid=${process.env.WETAHER_API}&q=${req.params.region}`
      )
      .then((res) => {
        return [
          (res.data.main.temp_max + res.data.main.temp_min) / 2 - 273.15,
          res.data.main.humidity,
        ];
      });
    console.log(temp);

    // const testall = await axios
    //   .get(
    //     `https://history.openweathermap.org/data/2.5/aggregated/year?lat=${lat}&lon=${lon}&appid=30597233454e23d736adf43c366381c1`
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });
    // console.log(testall.data);

    //NOTE-uncomment for gemini till NEXT NOTE
    /*
    const convertedData = Object.entries(ans).reduce((acc, [key, value]) => {
      // Convert all values to strings
      const stringValue = value.toString();
      // Change the key 'pH' to 'ph'
      const newKey = key === "pH" ? "ph" : key;
      // Add the new key-value pair to the accumulator
      acc[newKey] = stringValue;
      return acc;
    }, {});
    // convertedData.rainfall = `${rainfall / 12}`;
    // console.log(convertedData);

    console.log(Number(convertedData.rainfall));
    NOTE 
    */
    const convertedData = {
      nitrates: `${req.params.N}`,
      phosphates: `${req.params.P}`,
      potassium: `${req.params.K}`,
      ph: `${req.params.ph}`,
      temperature: `${temp}`,
      rainfall: `${Number(rainfall)}`,
      humidity: `${humidity}`,
    };

    console.log(convertedData);
    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      convertedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const ans1 = await model
      .generateContent(
        `im growing a ${response.data} in ${req.params.region} in india. Are there any specific pest or disease management strategies for this crop. give me an answer in  40 words. start directly with use.. `
      )
      .then((content) => content.response.text());
    const ans2 = await model
      .generateContent(
        `im growing a ${response.data}in ${req.params.region} in india. What are some other crops that i can grow. start your answer with you can also... . also mention about Krishi Vigyan Kendra.Aanswer in 40 words`
      )
      .then((content) => content.response.text());
    res.send([response.data, ans1, ans2]);
  } catch (error) {
    console.log(error);
    // console.error("Error predicting:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { recognizeDisease, upload, predict, test1 };
