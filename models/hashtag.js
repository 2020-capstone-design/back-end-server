const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            hashtag_id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
            title: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Hashtag',
            tableName: 'hashtags',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Hashtag.belongsToMany(db.Restaurant, { as: 'RestaurantHashtags', through: 'restaurants_has_hashtags', foreignKey: 'hashtag_id' });
    }

}
