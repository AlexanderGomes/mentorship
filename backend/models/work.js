const mongoose = require("mongoose");

const workSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  company: String,
  position: String,
  period: String
});

module.exports = mongoose.model("Work", workSchema);
