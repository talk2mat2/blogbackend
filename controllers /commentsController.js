const { genericResponse, responsecodes } = require("../utils");


exports.createComment= async (req, res) => {
    let response = genericResponse("success", responsecodes.error);
    return res.status(200).json(response);
  };
  