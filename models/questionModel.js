const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  isAnswered: {
    type: Boolean,
    required: true,
  },
});

const Question = mongoose.model("questions", questionSchema);

module.exports = Question;
