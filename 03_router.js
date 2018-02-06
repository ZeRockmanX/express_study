var express = require('express');
var app = express();
//Express 定义了如下和 HTTP 请求对应的路由方法：
// get, post, put, head, delete, options, trace, copy, lock,
// mkcol, move, purge, propfind, proppatch, unlock, report,
// mkactivity, checkout, merge, m-search, notify, subscribe,
// unsubscribe, patch, search, 和 connect

// Get 请求
app.get('/', function (request, response) {
    response.send('http://localhost:3000/');
});
// 匹配 /random.text 路径的请求
app.get('/random.text', function (req, res) {
    res.send('random.text');
});

// 使用字符串模式的路由路径示例：
// 匹配 acd 和 abcd
app.get('/ab?cd', function(req, res) {
    res.send('ab?cd');
});

// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', function(req, res) {
    res.send('ab+cd');
});

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get('/ab*cd', function(req, res) {
    res.send('ab*cd');
});

// 使用正则表达式的路由路径示例：字符 ?、+、* 和 () 是正则表达式的子集，- 和 . 在基于字符串的路径中按照字面值解释。
// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e', function(req, res) {
    res.send('ab(cd)?e');
});

// 匹配任何路径中含有 a 的路径：
app.get(/a/, function(req, res) {
    res.send('/a/');
});

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function(req, res) {
    res.send('/.*fly$/');
});


// 有些路由方法名不是合规的 JavaScript 变量名，此时使用括号记法，比如： app['m-search']('/', function ...
app['m-search']('/', function (request, response) {
    response.send('this is http://localhost:3000/m-search/');
});

// Post 请求
app.post('/', function (request, response) {
    response.send('Got a POST request http://localhost:3000/');
});

// /user 节点接受 PUT 请求
app.put('/user', function (request, response) {
    response.send('Got a PUT request at http://localhost:3000/user');
});

// /user 节点接受 DELETE 请求
app.delete('/user', function (request, response) {
    response.send('Got a DELETE request at http://localhost:3000/user');
});

// app.all() 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。
// 在下面的例子中，来自 “/secret” 的请求，不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行。
app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...');
    next(); // pass control to the next handler
});


//使用一个回调函数处理路由：

app.get('/example/a', function (req, res) {
    res.send('Hello from A!');
});

//使用多个回调函数处理路由（记得指定 next 对象）：

app.get('/example/b', function (req, res, next) {
    console.log('response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from B!');
});

//使用回调函数数组处理路由：

var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
};

var cb1 = function (req, res, next) {
    console.log('CB1');
    next();
};

var cb2 = function (req, res) {
    res.send('Hello from C!');
};

app.get('/example/c', [cb0, cb1, cb2]);

//混合使用函数和函数数组处理路由：

var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
};

var cb1 = function (req, res, next) {
    console.log('CB1');
    next();
};

app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from D!');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

//响应方法
/*
方法	描述
res.download()	提示下载文件。
res.end()	终结响应处理流程。
res.json()	发送一个 JSON 格式的响应。
res.jsonp()	发送一个支持 JSONP 的 JSON 格式的响应。
res.redirect()	重定向请求。
res.render()	渲染视图模板。
res.send()	发送各种类型的响应。
res.sendFile	以八位字节流的形式发送文件。
res.sendStatus()	设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。
*/

/*
app.route()
可使用 app.route() 创建路由路径的链式路由句柄。由于路径在一个地方指定，这样做有助于创建模块化的路由，而且减少了代码冗余和拼写错误。请参考 Router() 文档 了解更多有关路由的信息。

下面这个示例程序使用 app.route() 定义了链式路由句柄。

app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
 */

/*
express.Router
可使用 express.Router 类创建模块化、可挂载的路由句柄。Router 实例是一个完整的中间件和路由系统，因此常称其为一个 “mini-app”。

下面的实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将它们挂载至应用的路径上。

在 app 目录下创建名为 birds.js 的文件，内容如下：

var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
然后在应用中加载路由模块：

var birds = require('./birds');
...
app.use('/birds', birds);
应用即可处理发自 /birds 和 /birds/about 的请求，并且调用为该路由指定的 timeLog 中间件。
 */