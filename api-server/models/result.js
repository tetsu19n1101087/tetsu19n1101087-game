const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://tetsu19n1101087-db-service:27017/game').then(() => {
  console.log('mongoose successfully connects')
})
.catch(err => console.log(err));

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