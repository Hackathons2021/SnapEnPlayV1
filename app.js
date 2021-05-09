var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const csrf = require("csurf");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const {spawn} = require('child_process');
var indexRouter = require('./routes/index');
const multer = require('multer');
var app = express();
// const csrfMiddleware = csrf({ cookie: true });

// view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(csrfMiddleware);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// app.all("*", (req, res, next) => {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   next();
// });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
   res.render('index',{name:'kk'});
});

const port = process.env.PORT || 3000
app.listen(port)
module.exports = app;
