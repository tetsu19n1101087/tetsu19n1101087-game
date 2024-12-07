const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.NODE_ENV === 'docker' ? 5000 : 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const generateRouter = require('./routes/generate');
const resultsRouter = require('./routes/results');

app.use('/generate', generateRouter);
app.use('/results', resultsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
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
