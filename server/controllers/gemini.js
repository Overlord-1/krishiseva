const model = require("../services/gemini.js");
const run = async (req, res) => {
  try {
    const region = req.body.region;
    const question = req.body.question;
    console.log(region, question);
    const result = await model.generateContent(
      `im a farmer living in the countryside of ${region}of india.accordingly answer the following:
       ${question}. `
    );
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.send(text);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Internal Server Error ${err}`);
  }
};
module.exports = { run };
