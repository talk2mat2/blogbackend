const express = require("express");
const { createPost, getAllPost, deletePost, editPost } = require("../controllers /postsController");
const { postsValidator } = require("../utils/Validators");
const { authRoute } = require("../middleware/auth");

const router = express.Router();

router.post("/", authRoute, postsValidator, createPost);
router.get("/", getAllPost);
router.delete("/:id", deletePost);
router.patch("/:id", editPost);

module.exports = router;
