const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
require('dotenv').config();

const restaurantRouter = require('./routes/restaurant');
const menuRouter = require('./routes/menu');
const authRouter = require('./routes/auth');
const ownerRouter = require('./routes/owner');
const searchRouter = require('./routes/search');
const { sequelize } = require('./models');
const logger = require('./logger');

const app = express();

sequelize.sync({ force: false})
    .then(() => {
      console.log('데이터베이스연결 성공');
    })
    .catch((err) => {
      console.error(err);
    });

app.set('port', process.env.PORT || 3000);

if(process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/restaurant', restaurantRouter);
app.use('/menu', menuRouter);
app.use('/auth', authRouter)
app.use('/owner', ownerRouter);
app.use('/search', searchRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  return res.status(err.status || 500).json(err.message);
});

app.listen(app.get('port'), 3000, () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

module.exports = app;
