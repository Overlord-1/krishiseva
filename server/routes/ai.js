const express = require("express");
const router = express.Router();
const {
  upload,
  recognizeDisease,
  predict,
  test1,
} = require("../controllers/ai");
router.route("/paramenters").post();
router.route("/recognize").post(upload.single("ai"), recognizeDisease);
router.route("/predict/:id").get(test1);
module.exports = router;
// Path: server/routes/forum.js

// recongnize  -- photo name "ai"
// /recognize => res == name of the disease
