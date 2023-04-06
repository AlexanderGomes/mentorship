const mongoose = require('mongoose')

const contractSchema = mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  agrement: String,
  term: Date,
  price: Number,
  isAccepted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Contract", contractSchema);
