const Question = require("../models/Question");
const Answer = require("../models/Answer");

const createQuestion = async (req, res) => {
  try {
    const content = {
      user: req.body.user,
      questionString: req.body.questionString,
      parentQuestion: req.body.parentQuestion,
      parentAnswer: req.body.parentAnswer,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
    };
    const question = await Question.create(content);
    return res.status(201).json({ question });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};
//get question according to the question id
const getQuestion = async (req, res) => {
  try {
    const questions = await Question.findOne({ _id: req.params.questionId });
    if (!questions) return res.status(404).json({ err: "Questions not found" });
    return res.status(200).json(questions);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};
//edit question
const edit = async (req, res) => {
  try {
    let element;
    const id = req.body.id;
    const toPerform = req.body.toPerform;
    const incOrDec = req.body.incOrDec;
    element =
      (await Question.findOne({ _id: id })) ||
      (await Answer.findOne({ _id: id }));

    if (!element) {
      return res.status(404).json({ err: "Question/answer not found" });
    }
    if (toPerform === "like") {
      element.likes += incOrDec === "inc" ? 1 : -1;
    } else if (toPerform === "dislike") {
      element.dislikes += incOrDec === "inc" ? 1 : -1;
    }

    element.save();
    return res.status(200).json({ element });
  } catch (err) {
    console.log(err);
  }
};

//create answer for a parentQuestion
const createAnswer = async (req, res) => {
  try {
    const content = {
      user: req.body.user,
      answerString: req.body.answerString,
      parentQuestion: req.body.parentQuestion,
      parentAnswer: req.body.parentAnswer,
    };

    const answer = await Answer.create(content);
    return res.status(201).json({ answer });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};

// Get all answers for a parentQuestion or parentAnswer
const getAnswers = async (req, res) => {
  try {
    let query = {};

    if (req.body.parentQuestion) {
      query.parentQuestion = req.body.parentQuestion;
    }

    if (req.body.parentAnswer) {
      query.parentAnswer = req.body.parentAnswer;
    }

    const answers = await Answer.find(query);
    if (!answers) return res.status(404).json({ err: "Answers not found" });
    return res.status(200).json({ answers });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};

const getAll = async (req, res) => {
  try {
    let query = {},
      questions;

    if (req.body.parentQuestion) {
      query.parentQuestion = req.body.parentQuestion;
    }

    if (req.body.parentAnswer) {
      query.parentAnswer = req.body.parentAnswer;
    }
    if (!(query.parentQuestion && query.parentAnswer)) {
      questions = await Question.find({
        $and: [
          { parentQuestion: "6619850c110d3aedae7ea015" },
          { parentAnswer: null },
        ], //global question
      });
      return res.status(200).json({ questions });
    }
    questions = await Question.find(query);
    const answers = await Answer.find(query);
    console.log(answers);
    return res.status(200).json({ questions, answers });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ err: err.message || "Internal Server Error" });
  }
};

module.exports = {
  createQuestion,
  getQuestion,
  edit,
  createAnswer,
  getAnswers,
  getAll,
};
// Path: server/models/Question.js
