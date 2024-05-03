const { validationResult } = require("express-validator");
const { genericResponse, responsecodes } = require("../utils");
const posts = require("../models/posts");

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let response = genericResponse(
      "validation erros occurs",
      responsecodes.error,
      errors
    );
    return res.status(400).json(response);
  }
  const { title, body } = req.body;
  const postedBy = req.body.id;
  try {
    const newBlogPost = new posts({ title, body, postedBy });
    await newBlogPost.save();
    let response = genericResponse(
      "successfully created",
      responsecodes.success
    );
    return res.status(200).json(response);
  } catch (err) {
    let response = genericResponse(
      "error occured pls try again or contact admin",
      responsecodes.success,
      req.body
    );
    return res.status(501).json(response);
  }
};
exports.getAllPost = async (req, res) => {
  try {
    let appPost = await posts.find({}).populate("comment");
    let response = genericResponse(
      "successfully retrieved",
      responsecodes.success,
      appPost
    );
    return res.status(200).json(response);
  } catch (err) {
    console.log(err)
    let response = genericResponse(
      "error occured pls try again or contact admin",
      responsecodes.success,
      req.body
    );
    return res.status(501).json(response);
  }
};
exports.deletePost = async (req, res) => {
  const postsId = req.params.id;
  try {
    let appPost = await posts.findByIdAndDelete(postsId);
    let response = genericResponse(
      "successfully deleted",
      responsecodes.success,
      appPost
    );
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    let response = genericResponse(
      "error occured pls try again or contact admin",
      responsecodes.success,
      req.body
    );
    return res.status(501).json(response);
  }
};

exports.editPost = async (req, res) => {
  const postsId = req.params.id;
  const { title, body } = req.body;
  try {
    let appPost = await posts.findByIdAndUpdate(
      { _id: postsId },
      { title, body },
      {new: true}
    );
    let response = genericResponse(
      "successfully updated",
      responsecodes.success,
      appPost
    );
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    let response = genericResponse(
      "error occured pls try again or contact admin",
      responsecodes.success,
      req.body
    );
    return res.status(501).json(response);
  }
};
