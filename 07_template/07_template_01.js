/*
需要在应用中进行如下设置才能让 Express 渲染模板文件：

views, 放模板文件的目录，比如： app.set('views', './views')
view engine, 模板引擎，比如： app.set('view engine', 'jade')
然后安装相应的模板引擎 npm 软件包。

$ npm install jade --save
 */


/*
在 views 目录下生成名为 index.jade 的 Jade 模板文件，内容如下：

html
  head
    title!= title
  body
    h1!= message
 */


var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
    //未设置app.set('view engine', 'jade') ->res.render('index.jade', { title: 'Hey', message: 'Hello there!'});
    res.render('index', {title: 'Hey', message: 'Hello there!'});
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
