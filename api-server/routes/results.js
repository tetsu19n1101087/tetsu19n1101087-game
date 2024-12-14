const express = require('express');
const Result = require('../models/result');

const router = express.Router();

router.post('/', (req, res) => {
  Result.create(req.body)
    .then(() => {
      res.header('Access-Control-Allow-Origin', '*');
      res.send('result created');
    })
    .catch((err) => {
      console.error('Error creating document:', err);
    });
});

router.get('/', (req, res) => {
  Result.findOne()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.send(result);
    })
    .catch((err) => {
      console.error('Error finding document:', err);
    });
});

module.exports = router;
