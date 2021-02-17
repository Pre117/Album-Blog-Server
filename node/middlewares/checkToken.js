const jwt = require('jsonwebtoken')
const secret = require('../config/secret')

async function checkToken(ctx, next) {
    let url = ctx.url.split('?')[0]
    console.log(url)

    if (url === '/user/login' || url ==='/user/register') {
        await next()
    }else {
        let token = ctx.request.headers.token

        if (token) {
            const tokenItem = jwt.verify(token, secret.secret) 
            const { exp } = tokenItem
            let data = new Date().getTime().toString().substr(0, 10)
            if (data <= exp) {
                console.log('check token success')
                await next()
            }else {
                ctx.body = {
                    status: 405,
                    message: 'token已过期，请重新登录'
                }
            }
        }else {
            ctx.body = {
                status: 404,
                message: '无token'
            }
        }
    }
}

module.exports = checkToken