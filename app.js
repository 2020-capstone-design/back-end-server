const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/v1');
const restaurantRouter = require('./routes/v1/restaurant');
const menuRouter = require('./routes/v1/menu');
const { sequelize } = require('./models');

const app = express();

sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));

app.use('/v1', indexRouter);
app.use('/v1/restaurant', restaurantRouter);
app.use('/v1/menu', menuRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  return res.status(err.status || 500).json(res.locals.error);
});

app.listen(app.get('port'), 50000, () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

module.exports = app;
