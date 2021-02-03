const sequelize = require('../config/sequelize')
const Blog = sequelize.import('../models/blog')
const User = sequelize.import('../models/user')

//发布文章
exports.publish = async function (username, content, title, imgUrl) {
    console.log(User)
    return Blog.create({
        username,
        content,
        title,
        imgUrl
    })
}

//查询一条文章
exports.show = async function (id, withUser = false) {
    const options = {}
    if (withUser) {
        options.include = [{
            model: User,
            as: 'user'
        }]
    }
}

// 查询所有文章
exports.showAll = async function() {
    return Blog.findAll()
}

//查询所有文章列表
// exports.list = async function (page = 1, size = 10) {

//     console.log(blog)
//     return Blog.findAndCountAll({
//         limit: size,
//         offset: (page - 1) * size,
//         order: [
//             ['id', 'DESC']
//         ],
//         include: [{
//             model: User,
//             attributes: ['id', 'nickname'],
//             as: 'user'
//         }]
//     })
// }

//用户发表的文章列表
exports.listByUser = async function (userId, page = 1, size = 10) {
    return Blog.findAndCountAll({
        where: {
            userId
        },
        limit: size,
        offset: (page - 1) * size,
        order: [
            ['id', 'DESC']
        ],
    });
}

//编辑文章

//删除文章