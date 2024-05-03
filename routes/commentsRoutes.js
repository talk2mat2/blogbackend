const express = require("express");
const { createComment, getAllComments, deleteComment, editComment } = require("../controllers /commentsController");
const { authRoute } = require("../middleware/auth");
const { commentsValidator } = require("../utils/Validators");

const router = express.Router();

router.post("/", authRoute, commentsValidator, createComment);
router.get("/", getAllComments);
router.delete("/:id", deleteComment);
router.patch("/:id", editComment);

module.exports = router;
