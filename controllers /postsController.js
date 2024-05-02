const { genericResponse, responsecodes } = require("../utils");

exports.createPost= async (req, res) => {
  let response = genericResponse("success", responsecodes.error);
  return res.status(200).json(response);
};
