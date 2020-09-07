const Sequelize = require('sequelize');

module.exports = class Restaurant extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            restaurant_num: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            restaurant_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            restaurant_phone: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            restaurant_loc: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            restaurant_university: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            restaurant_intro: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            restaurant_img: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            restaurant_logo: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            restaurant_category: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            restaurant_main_menu1: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            restaurant_main_menu2: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            restaurant_operating_time: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            restaurant_closed_days: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            restaurant_on_off: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            }
        }, {
            sequelize,
            timestamps: false,
            tableName: 'restaurants',
            modelName: 'Restaurant',
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
        });
    }
    static associate(db) {
        db.Restaurant.hasMany(db.Menu, { foreignKey: 'fk_restaurant_num', sourceKey: 'restaurant_num', onDelete: 'CASCADE'  });
        db.Restaurant.belongsTo(db.Owner, { foreignKey: 'fk_owner_id', targetKey: 'owner_id', onDelete: 'CASCADE' });
    }

}
