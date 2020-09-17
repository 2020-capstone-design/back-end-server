const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'production';
const config = require('../config/config')[env];
const db = {};

const Owner = require('./owner');
const Restaurant = require('./restaurant');
const Menu = require('./menu');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

db.Owner = Owner;
db.Restaurant = Restaurant;
db.Menu = Menu;

Owner.init(sequelize);
Restaurant.init(sequelize);
Menu.init(sequelize);

Owner.associate(db);
Restaurant.associate(db);
Menu.associate(db);

module.exports = db;
