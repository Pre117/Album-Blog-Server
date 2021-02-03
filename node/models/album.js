const {
    Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.import('./user')

    class Album extends Model {}

    Album.init({
        title: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '标题'
        },
        imgUrl: {
            type: DataTypes.STRING(500),
            allowNull: false,
            comment: '图片地址'
        },
    }, {
        sequelize: sequelize,
        tableName: 'Album',
        underscored: true,
        paranoid: true
    })

    Album.belongsTo(User, {
        constraints: false,
        foreignKey: 'userId',
        as: 'user'
    })


}