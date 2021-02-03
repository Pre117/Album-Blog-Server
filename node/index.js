const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const checkToken = require('./middlewares/checkToken')
const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')

const app = new Koa({
    keys: ['KGJ6NLxqOkYCNr1h']
})


//中间件
app.use(bodyParser()) // 获取前端发送post请求传过来的数据ctx.request.body（注册、登录）

app.use(checkToken) // 验证token是否过期
// 后端跨域（前端已设置，所以这里注释掉）
app.use(cors({
    origin: function (ctx) {
        return 'http://localhost:1818'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 1000,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

//路由
app.use(userRoute.routes()).use(userRoute.allowedMethods())
app.use(blogRoute.routes()).use(blogRoute.allowedMethods())

app.listen(3001, () => {
    console.log('listen on 3001')
})