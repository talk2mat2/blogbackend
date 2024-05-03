const { validationResult } = require("express-validator");
const userSchema = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { genericResponse, responsecodes } = require("../utils");
const { JWTKEY } = require("../config ");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  const password = req.body.password;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  if (!errors.isEmpty()) {
    let response = genericResponse(
      "validation erros occurs",
      responsecodes.error,
      errors
    );
    return res.status(400).json(response);
  }

  const existingUser = await userSchema.findOne({ email: email });

  if (existingUser) {
    let response = genericResponse(
      `a user with email ${email}is already registred, try to login`,
      responsecodes.error,
      errors
    );
    return res.status(401).json(response);
  }

  try {
    const passwordhash = bcrypt.hashSync(password, 10);
    const newUser = new userSchema({
      email,
      password: passwordhash,
      firstName,
      lastName,
    });
    await newUser.save();
    delete req.body.password;
    let response = genericResponse(
      `Account created successfully!`,
      responsecodes.success,
      req.body
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

exports.login = async function (req, res) {
  const errors = validationResult(req);
  const password = req.body.password;
  const email = req.body.email;
  if (!errors.isEmpty()) {
    let response = genericResponse(
      "validation erros occurs",
      responsecodes.error,
      errors
    );
    return res.status(400).json(response);
  }

  userSchema
    .findOne({ email })
    .then(async function (user) {

      if (!user) {
        let response = genericResponse(
          "A user with this account does not exist",
          responsecodes.error
        );
        return res.status(501).json(response);
      } else if (user) {
        const match = await user.verifyPassword(password);
        if (!match) {
          let response = genericResponse(
            "The entered password or username is not correct",
            responsecodes.error
          );
          return res.status(501).json(response);
        } else {
          user.password=null;
          let response = genericResponse(
            "login successful",
            responsecodes.success,
            {
              token: jwt.sign({ user: user }, JWTKEY, {
                expiresIn: "17520hr",
              }),
              user,
            }
          );
          return res.status(200).json(response);
        }
      }
    })
    .catch((err) => {
        delete req.body.password
      let response = genericResponse(
        "error occured pls try again or contact admin",
        responsecodes.success,
        req.body
      );
      return res.status(501).json(response);
    }); //here
};
