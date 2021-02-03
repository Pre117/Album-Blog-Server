const sequelize = require('../config/sequelize')
const User = sequelize.import('../models/user')
const jwt = require('jsonwebtoken')
const secret = require('../config/secret')

//注册账号
exports.register = async function (username, password, email) {
    const user = await User.findOne({
        where: {
            username
        }
    })
    if (user !== null) {
        throw new Error("账号已存在")
    }
    return User.create({
        username,
        password,
        email
    })
}
// 通过token查询user数据
exports.show = async function (token) {
    const user = await User.findOne({
        where: {
            token
        }
    })
    return user
}

//登录
exports.login = async function username(username, password) {
    // console.log(User)
    const user = await User.findOne({
        where: {
            username
        }
    })

    // token数据
    const payload = {
        username,
        password
    }
    
    // 签发token
    const token = jwt.sign(payload, secret.secret, { expiresIn: '1day' })

    await user.update(
        { token }
    )
    return user
}

//查看用户信息


//修改个人资料