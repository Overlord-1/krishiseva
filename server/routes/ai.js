const express = require("express");
const router = express.Router();
const { upload, recognizeDisease } = require("../controllers/ai");
router.route("/paramenters").post();
router.route("/recognize").post(upload.single("ai"), recognizeDisease);
module.exports = router;
// Path: server/routes/forum.js
