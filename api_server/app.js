var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileStreamRotator=require('file-stream-rotator')
let cors=require("cors")
require("./utils/db")
require("express-async-errors")
var expressJwt=require('express-jwt')
var config=require('./config/config')
var fs=require("fs")


var indexRouter = require('./routes/index');

var app = express();

app.use(cors())
// JWT配置
app.use(expressJwt({
  secret: config.jwt.secret
}).unless({
  path:config.jwt.unless
}))


// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) //日志
// app.use(logger('combined', { stream: accessLogStream }))

//日志处理
var logDir=path.join(__dirname,'log');
// fs.existsSync(logDir)|| fs.mkdirSync(logDir) //检测文件是否存在，不存在就创建

var accessLogStream = fileStreamRotator.getStream({
  date_format:'YYYY-MM-DD',
  filename:path.join(logDir,'access-%DATE%.log'),
  frequency:'daily', //1h 一小时一次
  verbose:false
})

app.use(logger('combined', { stream: accessLogStream }))

app.use(logger('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);


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
  res.json({
    msg:err.message
  });
});


module.exports = app;
