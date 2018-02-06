/*
内置中间件
从 4.x 版本开始，, Express 已经不再依赖 Connect 了。
除了 express.static, Express 以前内置的中间件现在已经全部单独作为模块安装使用了。请参考 中间件列表。

express.static(root, [options])
express.static 是 Express 唯一内置的中间件。它基于 serve-static，负责在 Express 应用中提托管静态资源。

参数 root 指提供静态资源的根目录。

可选的 options 参数拥有如下属性。

属性	描述	类型	缺省值
dotfiles	是否对外输出文件名以点（.）开头的文件。可选值为 “allow”、“deny” 和 “ignore”	String	“ignore”
etag	是否启用 etag 生成	Boolean	true
extensions	设置文件扩展名备份选项	Array	[]
index	发送目录索引文件，设置为 false 禁用目录索引。	Mixed	“index.html”
lastModified	设置 Last-Modified 头为文件在操作系统上的最后修改日期。可能值为 true 或 false。	Boolean	true
maxAge	以毫秒或者其字符串格式设置 Cache-Control 头的 max-age 属性。	Number	0
redirect	当路径为目录时，重定向至 “/”。	Boolean	true
setHeaders	设置 HTTP 头以提供文件的函数。	Function
 */

var express = require('express');
var app = express();

// 下面的例子使用了 express.static 中间件，其中的 options 对象经过了精心的设计。
var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now());
    }
};

app.use(express.static('public', options));
//每个应用可有多个静态目录。
/*
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
*/

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


/*
第三方中间件
通过使用第三方中间件从而为 Express 应用增加更多功能。

安装所需功能的 node 模块，并在应用中加载，可以在应用级加载，也可以在路由级加载。

下面的例子安装并加载了一个解析 cookie 的中间件： cookie-parser

$ npm install cookie-parser
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// 加载用于解析 cookie 的中间件
app.use(cookieParser());
请参考 第三方中间件 获取 Express 中经常用到的第三方中间件列表。
 */