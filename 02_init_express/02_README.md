通过应用生成器工具 express 可以快速创建一个应用的骨架。

通过如下命令安装：

$ npm install express-generator -g

-h 选项可以列出所有可用的命令行选项：

$ express -h

例如，下面的示例就是在当前工作目录下创建一个命名为 myapp 的应用。

$ express myapp

然后安装所有依赖包：

$ cd myapp
$ npm install

启动这个应用（MacOS 或 Linux 平台）：

$ DEBUG=myapp npm start
Windows 平台使用如下命令：

> set DEBUG=myapp & npm start
然后在浏览器中打开 http://localhost:3000/ 网址就可以看到这个应用了。