exports.genericResponse = (
  responseMessage = "",
  responseCode = "",
  data = null
) => {
  return {
    responseMessage,
    responseCode,
    data,
  };
};

exports.responsecodes = {
  success: "02",
  error: "09",
};
