var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');

var security = require('./config/securityconfig')
var cors = require('cors')
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users-route');
var postRouter = require('./routes/post-route');
var adminRouter = require('./routes/admin-route');
var tokenRouter = require('./routes/token')

// File Upload Plugin
const fileUpload = require('express-fileupload')

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: '*'
}))


// file upload option
app.use(fileUpload({
  limits: {fileSize: 50 * 1024 * 1024}
}))


app.use('/', indexRouter);
app.use('/user',security.configure().authorize,userRouter);
app.use('/posts',security.configure().authorize,postRouter);
app.use('/admin',security.configure().authorize,adminRouter);
app.use('/token',security.configure().authorize,tokenRouter);

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
  //console.log(err.stack)
});

module.exports = app;
