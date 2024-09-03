const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mongopractice");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  userName: String,
});

module.exports = mongoose.model("user", userSchema);
