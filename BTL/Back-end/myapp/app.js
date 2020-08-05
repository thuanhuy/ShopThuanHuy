var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/computer');
var cameraRouter = require('./routes/camera');
var usersRouter = require('./routes/users');
var goiVayRouter = require('./routes/goiVay');
var loginRouter = require('./routes/Login');
var goiLapDatRouter = require('./routes/goiLapDat');
var khachHang = require('./routes/Client');
var lapDat = require('./routes/lapDat');
var thietbi = require('./routes/device');
const { Router } = require('express');
// var goiLapDatRouter = require('./routes/goiLapDat');
// var apiControler = require("./controllers/apController");
// var homeControler = require("./controllers/homeController");



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add fix error cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/computer', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/goiVayRouter', goiVayRouter);
app.use('/goiLapDatRouter', goiLapDatRouter);
app.use('/camera', cameraRouter);
app.use('/Client', khachHang);
app.use('/LapDat', lapDat);
app.use('/thietbi', thietbi);
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


// apiControler(app);
// homeControler(app);
module.exports = app;