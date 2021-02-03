const {
    Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.import('./user')

    class Blog extends Model {}

    Blog.init({
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '作者'
        },
        content: {
            type: DataTypes.STRING(10000),
            allowNull: false,
            comment: '内容'
        },
        title: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '标题'
        },
        imgUrl: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '图片地址'
        },
    }, {
        sequelize: sequelize,
        tableName: 'blog',
        underscored: true,
        paranoid: true
    })

    // Blog.belongsTo(User, {
    //     constraints: false,
    //     foreignKey: 'userId',
    //     as: 'user'
    // })
    return Blog

}