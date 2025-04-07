const express = require('express');
const path = require('path');
const createError = require('http-errors');
const bodyParser = require('body-parser')
const logger = require('morgan');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const ejs = require('ejs');
const port = 4000

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Middleware to parse the request body (for form submissions)
app.use(logger('dev'));
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//  Routes
app.use('/', indexRouter);
app.use('/', loginRouter);



//catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  
//const indexRouter = require('./routes/index');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;