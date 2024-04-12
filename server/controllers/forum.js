const Question = require("../models/Question");
const Answer = require("../models/Answer");

const createQuestion = async (req, res) => {
  try {
    const content = {
      user: req.body.user,
      questionString: req.body.questionString,
      parentQuestion: req.body.parentQuestion,
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
const editQuestion = async (req, res) => {
  try {
    const { id, likes, dislikes } = req.body;
    const question = await Question.findOne({ _id: id });
    if (!question) {
      return res.status(404).json({ err: "Question not found" });
    }
    question.likes = likes;
    question.dislikes = dislikes;
    question.save();
    return res.status(200).json({ question });
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
    const answers = await Answer.find({
      $or: [
        { parentQuestion: req.params.parentQuestion },
        { parentAnswer: req.params.parentAnswer },
      ],
    });
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
    let query = {};

    if (req.body.parentQuestion) {
      query.parentQuestion = req.body.parentQuestion;
    }

    if (req.body.parentAnswer) {
      query.parentAnswer = req.body.parentAnswer;
    }

    const questions = await Question.find(query);
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
  editQuestion,
  createAnswer,
  getAnswers,
  getAll,
};
// Path: server/models/Question.js
