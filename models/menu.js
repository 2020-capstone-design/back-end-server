module.exports = (sequlize, DataTypes) => {
    return sequlize.define('menu', {
        menu_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        menu_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        menu_price: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
    }, {
        timestamps: false,
        tableName: 'menus',
    })
}
