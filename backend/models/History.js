const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    agentType: {
      type: String,
      required: true,
      trim: true,
    },
    userInput: {
      type: Object,
      required: true,
    },
    aiOutput: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("History", historySchema);
