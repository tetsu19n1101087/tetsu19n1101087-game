const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const characterList = '0123456789!"#$%&\'()-=^~¥|@`[]{};+:*,<>./\\?'.split(
    ''
  );
  let randomList = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characterList.length);
    const randomElement = characterList.splice(randomIndex, 1)[0];
    randomList.push(randomElement);
  }
  res.header('Access-Control-Allow-Origin', '*');
  res.send(randomList);
});

module.exports = router;