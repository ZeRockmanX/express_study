var express = require('express');
var app = express();

// 如果需要在中间件栈中跳过剩余中间件，调用 next('route') 方法将控制权交给下一个路由。
// 注意： next('route') 只对使用 app.VERB() 或 router.VERB() 加载的中间件有效。

// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
    // 如果 user id 为 0, 跳到下一个路由 -> 渲染一个特殊页面
    if (req.params.id == 0) next('route');
    // 否则将控制权交给栈中下一个中间件
    else next(); // -> 渲染常规页面
}, function (req, res, next) {
    // 渲染常规页面
    console.log("res.render('regular');");
});

// 处理 /user/:id， 渲染一个特殊页面
app.get('/user/:id', function (req, res, next) {
    console.log("res.render('special');");
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});