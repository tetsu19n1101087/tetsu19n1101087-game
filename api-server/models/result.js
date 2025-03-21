const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new Schema(
  {
    time: Number,
    correctTypingNumber: Number,
    average: Number,
    missTypingNumber: Number,
    accuracy: Number,
  },
  { timestamps: true }
);

const Result = mongoose.model('Result', ResultSchema);

module.exports = Result;
