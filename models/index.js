const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Member = require('./member')(sequelize, Sequelize);
db.Menu = require('./menu')(sequelize, Sequelize);
db.Restaurant = require('./restaurant')(sequelize, Sequelize);

db.Member.hasMany(db.Restaurant, { foreignKey: 'fk_m_id' , sourceKey: 'm_id' } );
db.Restaurant.belongsTo(db.Member, { foreignKey: 'fk_m_id', targetKey: 'm_id' });
db.Restaurant.hasMany(db.Menu, { foreignKey: 'fk_rest_num', sourceKey: 'rest_num' });
db.Menu.belongsTo(db.Restaurant, { foreignKey: 'fk_rest_num', targetKey: 'rest_num'  });

module.exports = db;
