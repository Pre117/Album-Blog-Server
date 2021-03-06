const {
    Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
    }

    User.init({
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: '账号不能为空'
                },
                len: {
                    msg: '账号长度为6-20位'
                }
            },
            comment: '账号'
        },
        password: {
            type: DataTypes.CHAR(64),
            allowNull: false,
            comment: '密码'
        },
        email: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '邮箱'
        },
        token: {
            type: DataTypes.STRING(),
            allowNull: true,
            comment: '令牌'
        }
    }, {
        sequelize: sequelize,
        tableName: 'user',
        underscored: true,
        paranoid: true,
        indexes: [{
            name: 'idx_username',
            fields: ['username']
        }]
    });

    // User.beforeSave((user) => {
    //     // 密码处理
    //     if (user.changed('password') && user.password.length > 0) {
    //         user.password = security.sha256(user.password);
    //     }
    // });
    return User;
}