const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const user = mongoose.model("User", dataSchema);
module.exports = user;
