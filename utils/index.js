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
exports.validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

exports.responsecodes = {
  success: "02",
  error: "09",
};
