module.exports = (sequelize, DataTypes) => {
    return sequelize.define('member', {
        m_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        m_password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        m_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        m_birth: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        m_phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: false,
        tableName: 'member',
    })
}
