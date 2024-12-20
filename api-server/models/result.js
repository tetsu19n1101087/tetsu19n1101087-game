const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const url =
  'mongodb://mongodb-0.mongodb-service.default.svc.cluster.local,mongodb-1.mongodb-service.default.svc.cluster.local,mongodb-2.mongodb-service.default.svc.cluster.local:27017/test?replicaSet=rs0';

mongoose
  .connect(url)
  .then(() => {
    console.log('mongoose successfully connects');
  })
  .catch((err) => {
    console.log(err);
    if (err.name === 'MongooseServerSelectionError') {
      console.log(err.reason.servers);
    }
  });

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
