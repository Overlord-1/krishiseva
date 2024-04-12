const express = require("express");
const router = express.Router();
const {
  getQuestion,
  createQuestion,
  editQuestion,
  createAnswer,
  getAnswers,
  getAll,
} = require("../controllers/forum");
router.route("/createQuestion").post(createQuestion);
router.route("/getQuestion/:questionId").get(getQuestion);
router.route("/edit").post(editQuestion);
router.route("/answers").post(createAnswer);
router.route("/answers/:parentQuestion/:parentAnswer").get(getAnswers);
router.route("/allAnswers").post(getAll);
module.exports = router;
// Path: server/models/Question.js
