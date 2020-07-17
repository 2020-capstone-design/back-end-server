const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Member = require('./owner')(sequelize, Sequelize);
db.Menu = require('./menu')(sequelize, Sequelize);
db.Restaurant = require('./restaurant')(sequelize, Sequelize);

db.Member.hasMany(db.Restaurant, { foreignKey: 'fk_owner_id' , sourceKey: 'owner_id' } );
db.Restaurant.belongsTo(db.Member, { foreignKey: 'fk_owner_id', targetKey: 'owner_id' });
db.Restaurant.hasMany(db.Menu, { foreignKey: 'fk_restaurant_num', sourceKey: 'restaurant_num' });
db.Menu.belongsTo(db.Restaurant, { foreignKey: 'fk_restaurant_num', targetKey: 'restaurant_num'  });

module.exports = db;
