const Sequelize = require('sequelize');

module.exports = class Menu extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            menu_num: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            menu_name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            menu_intro: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            menu_price: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
        }, {
            sequelize,
            timestamps: false,
            tableName: 'menus',
            modelName: 'Menu',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Menu.belongsTo(db.Restaurant, { foreignKey: 'fk_restaurant_num', targetKey: 'restaurant_num', onDelete: 'CASCADE' });
    }
}
