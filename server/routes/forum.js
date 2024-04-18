const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  // getQuestion,
  // createQuestion,
  // edit,
  // createAnswer,
  // getAnswers,
  // getAll,
  createElement,
  editElement,
  getAllElements,
} = require("../controllers/forum");
// router.route("/createQuestion").post(createQuestion);
// router.route("/getQuestion/:questionId").get(getQuestion);
// router.route("/edit").post(edit);
// router.route("/answers").post(createAnswer);
// router.route("/getAnswers").post(getAnswers);
// router.route("/all").post(getAll);
router.route("/createElement").post(createElement);
router.route("/editElement").post(editElement);
router.route("/getAllElements").post(getAllElements);
// try {
//   router
//     .route("/imgs")
//     .post(upload.single("myFile"), (req, res) => {
//       console.log("Body: ", req.body);
//       console.log("File: ", req.file);
//       res.send("File successfully uploaded.");
//     })
//     .get((req, res) => res.send(sharp("/server/uploads").png()));
// } catch (err) {
//   console.log(err);
// }
module.exports = router;
