const { Schema } = require("mongoose");

const comments = new Schema(
  {
    body: String,
    title: String,
    commentedBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    comments_for_post: {
      type: Schema.Types.ObjectId,
      ref: "posts",
    },
  },
  { timestamps: true }
);
