const { body } = require("express-validator");

exports.postsValidator = [
  body("title", "title can not be empty").not().isEmpty(),
  body("body", "body can not be empty").not().isEmpty(),
  body("body", "body should be string").isString(),
];

exports.commentsValidator = [
  body("postId", "postId can not be empty").not().isEmpty(),
  body("body", "body can not be empty").not().isEmpty(),
  body("body", "body should be string").isString(),
];

exports.registerValidator = [
  body("email", "email can not be empty").not().isEmpty(),
  body("email", "invalid email").isEmail(),
  body("password", "Password  can not be empty").not().isEmpty(),
  body("firstName", "firstName  can not be empty").not().isEmpty(),
  body("lastName", " laststName  can not be empty").not().isEmpty(),
];
exports.loginValidator = [
  body("email", "email can not be empty").not().isEmpty(),
  body("email", "invalid email").isEmail(),
  body("password", "Password  can not be empty").not().isEmpty(),
];
