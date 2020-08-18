module.exports = (sequelize, DataTypes) => {
    return sequelize.define('owner', {
        owner_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        owner_password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        owner_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        owner_birth: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        owner_phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: false,
        tableName: 'owners',
    })
}
