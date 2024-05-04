const express = require("express");
const router = express.Router();
const {
  upload,
  recognizeDisease,
  predict,
  predictCrop,
} = require("../controllers/ai");
router.route("/paramenters").post();
router.route("/recognize").post(upload.single("ai"), recognizeDisease);
router.route("/predict/:N/:P/:K/:ph/:region").get(predictCrop);
module.exports = router;
// Path: server/routes/forum.js

// recongnize  -- photo name "ai"
// /recognize => res == name of the disease
