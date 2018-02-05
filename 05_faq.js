/*
Express 常见问题
我的应用该如何组织？
对于这个问题其实没有一个确定的答案。这要根据你的应用的规模和参与开发的团队来确定。为了尽可能灵活，Express 自身是并没有硬性要求应用结构是哪一种的。

根据你的需求，可以把路由和其他应用相关的业务逻辑存放在任意多个文件和任意目录中。下面推荐的实例或许对你能有一些启发：
*/
Route listings
Route map
MVC style controllers
/*
另外，这里还有一些第三方 Express 扩展简化了这种组织方式：
*/
Resourceful routing
/*
如何定义模型（model）？
Express自身并不感知数据库是否存在。数据库功能依赖于第三方 Node 模块提供的接口。

如何验证用户？
这是另一个 Express 不涉及的领域。你可以使用任何验证方式。对于简单的用户名/密码验证方式，可以参考这个实例。

Express 支持哪些模板引擎？
Express 支持任何符合 (path, locals, callback) 接口规范的模板引擎。 为了统一模板引擎的接口和缓存功能，请参考 consolidate.js 项目。其他未提及的模板引擎也可能支持 Express 接口规范。

如何处理 404 ？
在 Express 中，404 并不是一个错误（error）。因此，错误处理器中间件并不捕获 404。这是因为 404 只是意味着某些功能没有实现。也就是说，Express 执行了所有中间件、路由之后还是没有获取到任何输出。你所需要做的就是在其所有他中间件的后面添加一个处理 404 的中间件。如下：
*/
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});
/*
如何设置一个错误处理器？
错误处理器中间件的定义和其他中间件一样，唯一的区别是 4 个而不是 3 个参数，即 (err, req, res, next)：
*/
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
/*
请参考错误处理章节以了解更多信息。

如何渲染纯 HTML 文件？
不需要！无需通过 res.render() 渲染 HTML。你可以通过 res.sendFile() 直接对外输出 HTML 文件。如果你需要对外提供的资源文件很多，可以使用 express.static() 中间件。
*/