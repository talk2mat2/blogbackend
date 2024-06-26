const mongoose = require("mongoose");

const { Schema } = mongoose;

const posts = new Schema(
  {
    title: { type: String, required: true }, // String is shorthand for {type: String}
    body: String,
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", posts);
