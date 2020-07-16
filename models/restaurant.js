module.exports = (sequelize, DataTypes) => {
    return sequelize.define('restaurant', {
        rest_num: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        rest_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rest_phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rest_loc: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rest_university: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rest_intro: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        rest_img: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rest_logo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rest_category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rest_main_menu1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rest_main_menu2: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        timestamps: false,
        tableName: 'restaurant',
    })
}
