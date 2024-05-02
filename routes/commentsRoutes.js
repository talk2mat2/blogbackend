const express = require("express");
const { createComment } = require("../controllers /commentsController");


const router = express.Router();

router.post("/", createComment);

module.exports = router;