const express = require('express');
const Result = require('../models/result');

const router = express.Router();

router.post('/', (req, res) => {
  Result.create(req.body).then(() => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send('result preserved');
  });
});

router.get('/', (req, res) => {
  Result.findOne({
    order: [['createdAt', 'DESC']],
  }).then((result) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send(result);
  });
});

module.exports = router;
