// 文章
const Router = require('koa-router');
// const multer = require('@koa/multer')
const blogService = require('../services/blog');
const userService = require('../services/user')
const router = new Router({
    prefix: '/blog'
});

// const upload = multer()

router.get('/test', async (ctx) => {
    console.log('2232')
    ctx.body = '<h1>hello</h1>'
})

router.post('/publish', async (ctx) => {
    const {
        content
    } = ctx.request.body;

    const {
        token
    } = ctx.request.headers

    const user = await userService.show(token)

    if (!content) {
        throw new Error('文章内容不能为空');
    }
    if (content.length > 10000) {
        throw new Error('文章最大10000字');
    }

    let title = 'test'
    let imgUrl = 'testImgUrl'
    const blog = await blogService.publish(user.username, content, title, imgUrl);
    ctx.body = blog
});

router.post('/upload', async (ctx) => {
    console.log('ctx.request.body', ctx.request.body);
    ctx.body = 'done';
})

router.get('/showall', async (ctx) => {
    const blog = await blogService.showAll()
    ctx.body = blog
})


module.exports = router;