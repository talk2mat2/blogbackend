const jwt = require("jsonwebtoken");
const { JWTKEY } = require("../config ");
const { genericResponse, responsecodes } = require("../utils");

exports.authRoute = async function (req, res, next) {
  const token = req.headers.authorization?.split(" ")?.[1];
  jwt.verify(token, JWTKEY, async function (err, decodedToken) {
    if (err) {
      let response = genericResponse(
        "Authorization failed, login to continue",
        responsecodes.error
      );
      return res.status(401).send(response);
    } else {
      req.body.id = decodedToken.user._id;
      next();
    }
  });
};
