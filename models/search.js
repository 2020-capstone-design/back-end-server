const Sequelize = require('sequelize');

module.exports = class Search extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            search_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            search_word: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            search_count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            university: {
                type: Sequelize.STRING(100),
                allowNull: false,
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
