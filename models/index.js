const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'production';
const config = require('../config/config')[env];
const db = {};

const Owner = require('./owner');
const Restaurant = require('./restaurant');
const Menu = require('./menu');
const Search = require('./search');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

db.Owner = Owner;
db.Restaurant = Restaurant;
db.Menu = Menu;
db.Search = Search;

Owner.init(sequelize);
Restaurant.init(sequelize);
Menu.init(sequelize);
Search.init(sequelize);

Owner.associate(db);
Restaurant.associate(db);
Menu.associate(db);

module.exports = db;
