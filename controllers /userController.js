const { validateEmail, genericResponse, responsecodes } = require("../utils");

exports.register = async (req, res) => {
  const Password = req.body.password;
  const Email = req.body.email;

  if (!validateEmail(Email)) {
    let response = genericResponse(
      "pls use a valid email address to register",
      responsecodes.error
    );
    return res.status(400).json(response);
  }

  if (!Password || !Email) {
    let response = genericResponse(
      "oops! you didnt fill all values required,kindly try again",
      "09"
    );
    return res.status(404).json(response);
  }

  const existingUser = await UserSchema.findOne({ Email: Email });
  if (existingUser) {
    return res.status(401).json({
      message: `a user with email ${Email}is already registred, try to login`,
    });
  }

  try {
    const Passwordhash = bcrypt.hashSync(Password, 10);
    const newUser = new UserSchema({
      Email,
      Password: Passwordhash,
    });
    await newUser.save();
    //first level referrer
    //authenticate user here Login
    this.Login(req, res);
  } catch (err) {
    console.log(err);
    return res.status(501).send({
      message: "error occured pls try again or contact admin",
      err: err,
    });
  }
};
