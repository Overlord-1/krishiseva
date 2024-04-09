const express = require("express");
const router = express.Router();
const { getMessages } = require("../controllers/getMessages");
router.route("/").get(getMessages);
module.exports = router;
