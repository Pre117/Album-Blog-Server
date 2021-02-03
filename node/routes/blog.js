// 文章
const Router = require('koa-router');
const multer = require('@koa/multer')
const blogService = require('../services/blog');
const userService = require('../services/user')
const router = new Router({
    prefix: '/blog'
});

const upload = multer()

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
    // let res = await blogService.list()
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

router.get('/show/:id', async (ctx) => {
    let {
        page = 1, size = 10
    } = ctx.query;
    page = Number(page);
    size = Number(size);
    // 读取微博
    const blogId = ctx.params.id;
    const blog = await blogService.show(blogId, true);
    if (!blog) {
        throw new Error('文章不存在');
    }
    await ctx.render('blog/show', {
        blog,
        count,
        page,
        size
    });
});

//编辑文章
// router.get('/edit/:id', async (ctx) => {
//     const weibo = await blogService.show(ctx.params.id);
//     if (!weibo || weibo.userId !== ctx.state.userId) {
//         throw new Error('微博不存在');
//     }
//     await ctx.render('weibo/edit', {
//         weibo
//     });
// });

// router.post('/edit/:id', async (ctx) => {
//     const {content} = ctx.request.body;
//     if (!content) {
//         throw new Error('微博内容不能为空');
//     }
//     if (content.length > 140) {
//         throw new Error('微博最长140字');
//     }
//     await blogService.update(ctx.params.id, ctx.state.userId, content);
//     await ctx.redirect('back');
// });

// router.get('/delete/:id', guard, async (ctx) => {
//     await blogService.destroy(ctx.params.id, ctx.state.userId);
//     await ctx.redirect('back');
// });

module.exports = router;