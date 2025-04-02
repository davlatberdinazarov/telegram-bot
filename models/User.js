const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  chatId: String,
  username: String,
  firstName: String,
  lastName: String,
});

module.exports = mongoose.model("User", UserSchema);
