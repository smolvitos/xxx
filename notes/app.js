var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var methodOverride = require('method-override');
var messages = require('./middleware/messages');
var loadUserSession = require('./middleware/loadUserSession');
var indexRouter = require('./routes/index');
var mainRoute = require('./routes/main');
var registerRoute = require('./routes/register');
var loginRoute = require('./routes/login');
var logoutRoute = require('./routes/logout');
var recordsRoute = require('./routes/records');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(methodOverride('_method'))
app.use(messages);
app.use(loadUserSession);

app.use('/', indexRouter);
app.use('/main', mainRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/', recordsRoute);

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
  res.render('error');
});

module.exports = app;
