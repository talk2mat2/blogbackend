const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const comments = new Schema(
  {
    body: String,
    commentedBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "posts",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("comments", comments);