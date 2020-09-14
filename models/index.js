const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const Owner = require('./owner');
const Restaurant = require('./restaurant');
const Menu = require('./Menu');
const Hashtag = require('./hashtag');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

db.Owner = Owner;
db.Restaurant = Restaurant;
db.Menu = Menu;
db.Hashtag = Hashtag;

Owner.init(sequelize);
Restaurant.init(sequelize);
Menu.init(sequelize);
Hashtag.init(sequelize);

Owner.associate(db);
Restaurant.associate(db);
Menu.associate(db);
Hashtag.associate(db);

module.exports = db;
