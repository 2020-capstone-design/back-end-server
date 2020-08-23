const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('restaurant', {
        restaurant_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        restaurant_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        restaurant_phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        restaurant_loc: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        restaurant_university: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        restaurant_intro: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        restaurant_img: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        restaurant_logo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        restaurant_category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        restaurant_main_menu1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        restaurant_main_menu2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        restaurant_operating_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        restaurant_closed_days: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        restaurant_on_off: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW,
        },
    }, {
        timestamps: false,
        tableName: 'restaurants',
    })
}
