const express = require('express');
const app = express();
const port = process.env.NODE_ENV === 'docker' ? 5000 : 3001;

app.get('/', (req, res) => {
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});


app.listen(port, () => {
  console.log(`Game api server listening on port ${port}`);
});
