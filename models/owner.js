const Sequelize = require('sequelize');

module.exports = class Owner extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            owner_id: {
                type: Sequelize.STRING(20),
                allowNull: false,
                primaryKey: true,
            },
            owner_password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            owner_name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            owner_birth: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            owner_phone: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            tableName: 'owners',
            modelName: 'Owner',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Owner.hasMany(db.Restaurant, { foreignKey: 'fk_owner_id', sourceKey: 'owner_id', onDelete: 'CASCADE' });
    }
}
