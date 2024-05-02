const mongoose = require("mongoose");
const { dbUser, dbPass, databaseUrl } = require("../config ");


// };

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(databaseUrl);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;
