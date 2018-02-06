var express = require('express');
var app = express();

//作为中间件系统的路由句柄，使得为路径定义多个路由成为可能。
// 在下面的例子中，为指向 /user/:id 的 GET 请求定义了两个路由。
// 第二个路由虽然不会带来任何问题，但却永远不会被调用，因为第一个路由已经终止了请求-响应循环。


//两个一样指向 /user/:id的路由,只有第一个被执行 第二个不执行因为第一个路由已经终止了请求-响应循环。
// 一个中间件栈，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
    console.log('ID:', req.params.id);
    next();
}, function (req, res, next) {
    res.send('User Info');
});

// 处理 /user/:id， 打印出用户 id
app.get('/user/:id', function (req, res, next) {
    res.end(req.params.id);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});