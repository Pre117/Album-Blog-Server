// 用户路由
const Router = require('koa-router');
const userService = require('../services/user');
const blogService = require('../services/blog');

const router = new Router({
    prefix: '/user'
});


router.post('/login', async (ctx) => {
    const {
        username,
        password
    } = ctx.request.body;
    if (!username || !password) {
        ctx.response.status = 404
        ctx.response.body = '请填写完整！'
    } else {
        const user = await userService.login(username, password);
        if (!(user.username === username && user.password === password)) {
            ctx.response.status = 404
            ctx.response.body = '用户名或密码错误'
        } else {
            ctx.body = [
                user.username,
                user.token
            ]
        }
    }
});


router.post('/register', async (ctx) => {
    const {
        username,
        password,
        email
    } = ctx.request.body;
    if (!username || !password || !email) {
        throw new Error('请填写完整!');
    }
    // if (password !== confirmPassword) {
    //     throw new Error('确认密码不一致');
    // }
    const user = await userService.register(username, password, email);
    ctx.body = user
});

router.get('/show', async (ctx) => {
    let token = ctx.request.headers.token
    console.log(token)
    console.log('success')
    const list = await userService.show()
    ctx.body = list
})


module.exports = router;