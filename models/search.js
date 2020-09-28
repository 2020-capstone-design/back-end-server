const Sequelize = require('sequelize');

module.exports = class Search extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            search_word: {
                type: Sequelize.STRING(100),
                primaryKey: true,
            },
            search_count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        }, {
            sequelize,
            timestamps: false,
            tableName: 'searches',
            modelName: 'Search',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}
