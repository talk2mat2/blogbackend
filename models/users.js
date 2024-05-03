const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.verifyPassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);

  if (match) {
    return true;
  } else {
    return false;
  }
};

module.exports = mongoose.model("users", userSchema);
