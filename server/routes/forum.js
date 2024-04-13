const express = require("express");
const router = express.Router();
const {
  getQuestion,
  createQuestion,
  edit,
  createAnswer,
  getAnswers,
  getAll,
} = require("../controllers/forum");
router.route("/createQuestion").post(createQuestion);
router.route("/getQuestion/:questionId").get(getQuestion);
router.route("/edit").post(edit);
router.route("/answers").post(createAnswer);
router.route("/getAnswers").post(getAnswers);
router.route("/all").post(getAll);
module.exports = router;
// Path: server/models/Question.js
