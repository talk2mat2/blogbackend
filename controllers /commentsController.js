const { validationResult } = require("express-validator");
const { genericResponse, responsecodes } = require("../utils");
const comments = require("../models/comments");
const posts = require("../models/posts");

exports.createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let response = genericResponse(
      "validation erros occurs",
      responsecodes.error,
      errors
    );
    return res.status(400).json(response);
  }
  const { body, postId } = req.body;
  const commentedBy = req.body.id;
  try {
    const newComent = new comments({ body, commentedBy, postId });
    let updated= await newComent.save();
    const updatePostId = await posts.findById(postId);
    if (updatePostId != null) {
      updatePostId?.comment?.push(updated.id);
      await updatePostId.save()
    }
    let response = genericResponse(
      "successfully created",
      responsecodes.success
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
exports.getAllComments = async (req, res) => {
  try {
    let appPost = await comments.find({});
    let response = genericResponse(
      "successfully retrieved",
      responsecodes.success,
      appPost
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

exports.editComment = async (req, res) => {
    const commentId = req.params.id;
    const { title, body } = req.body;
    try {
      let appPost = await posts.findByIdAndUpdate(
        { _id: commentId },
        { body },
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


  exports.deleteComment = async (req, res) => {
    const commentId = req.params.id;
    try {
      let appComment = await posts.findByIdAndDelete(commentId);
      let response = genericResponse(
        "successfully deleted",
        responsecodes.success,
        appComment
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