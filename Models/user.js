const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  PasswordHash: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
