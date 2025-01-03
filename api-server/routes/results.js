const express = require('express');
const mongoose = require('mongoose');
const Result = require('../models/result');

const router = express.Router();

router.post('/', async (req, res) => {
  if (mongoose.connection.readyState === 0) {
    await connectDatabase();
  }

  await Result.create(req.body)
    .then(() => {
      res.header('Access-Control-Allow-Origin', '*');
      res.send('result created');
    })
    .catch((err) => {
      console.error('Error creating document:', err);
    })
});

router.get('/', async (req, res) => {
  if (mongoose.connection.readyState === 0) {
    await connectDatabase();
  }

  await Result.findOne()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.send(result);
    })
    .catch((err) => {
      console.error('Error finding document:', err);
    })
});

async function connectDatabase() {
  const url =
    process.env.NODE_ENV === 'docker'
      ? 'mongodb://app_user:app_password@mongodb-0.mongodb-service.default.svc.cluster.local,mongodb-1.mongodb-service.default.svc.cluster.local,mongodb-2.mongodb-service.default.svc.cluster.local:27017/game?replicaSet=rs0'
      : 'mongodb://localhost:27017';

  await mongoose
    .connect(url)
    .catch((err) => {
      console.log(err);
    });
}

module.exports = router;
