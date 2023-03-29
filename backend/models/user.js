const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add your name"],
  },
  email: {
    type: String,
    required: [true, "Please add your email"],
  },
  password: {
    type: String,
    required: [true, "Please add your password"],
  },
  contactNumber: String,
  contactEmail: String,

  careerTitle: String,
  profilePicture: String,
  location: String,
  aboutMe: String,
});

module.exports = mongoose.model("User", userSchema);
