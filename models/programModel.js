const mongoose = require("mongoose");

const programSchema = mongoose.Schema({
  program: {
    type: Object,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  dietician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dieticians",
    required: true,
  },
});

const Program = mongoose.model("program", programSchema);

module.exports = Program;
