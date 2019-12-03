var createError = require('http-errors');
var express = require('express');//引入express模块
var path = require('path');//引入path模块,该模块包括了一些处理文件路径的功能
var cookieParser = require('cookie-parser');//cookie操作中间件
// const session = require('express-session')
const jwt = require('jsonwebtoken');  //用来生成token
var logger = require('morgan'); //HTTP请求日志中间件
var cors = require('cors');//npm install cors --save 跨域node模块

/**
 * 因为nodejs是单线程的，所以一旦发生错误或异常，如果没有及时被处理整个系统就会崩溃。
 * 所以针对报错服务器就崩溃，进行下列异常处理。
 * 错误异常有两种场景的出现，一种是代码运行中throw new error没有被捕获，
 * 另一种是Promise的失败回调函数，没有对应的reject回调函数处理。
 * 针对这两种情况Nodejs都有默认的统一处理方式，就是给整个进程process对象监听相应的错误事件。
 */
process.on('uncaughtException',function(err){}); //监听未捕获的异常
//Note:unhandledRejection监听的函数有两个参数，第一个是错误对象，第二个是产生错误的promise对象，通过promise对象可以获得更多信息。
process.on('unhandledRejection',function(err,promise){}); //监听Promise没有被捕获的失败函数

/* 声明要访问的路由 该路由可自定义 */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');//自定义路由模块的引用
var infoRouter = require('./routes/webInfo');
var loginRouter = require('./routes/login');
var uploadRouter = require('./routes/uploader');
var homeRouter = require('./routes/home');
var newsRouter = require('./routes/news');
var seoRouter = require('./routes/seo')
var aboutUsRouter = require('./routes/aboutUs')
var productsRouter = require('./routes/products')
var feedBackRouter = require('./routes/feedBack')
var knowledgeRouter = require('./routes/knowledge')


var app = express(); /* 重要： 不可少 */
//手动设置 CORS 跨域访问，一定写在注册路由的前面
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

//使用模块设置 CORS 跨域访问，一定写在注册路由的前面
//app.use(cors());
let folderName = 'uploadFolder';//访问目录名称
app.use(express.static(folderName));//释放访问目录权限

app.get('/' + folderName +'/*', function (req, res) {
    res.sendFile( __dirname + "/" + req.url );
    console.log("Request for " + req.url + " received.");
})

//页面引擎设置
app.set('views', path.join(__dirname, 'views')); //设置views的目录,__dirname全局变量表示当前执行脚本所在的目录
app.set('view engine', 'jade');//设置渲染引擎

app.use(logger('dev'));//日志设置，使用参见https://github.com/expressjs/morgan
app.use(express.json());//解析JSON格式的post参数
// app.use(jwt);
app.use(express.urlencoded({ extended: false }));//解析urlencoeded编码的post参数，
app.use(cookieParser('wsp')); //cookie设置,自定义字符串，用来对cookie进行签名，提高安全性。
app.use(express.static(path.join(__dirname, 'public')));//静态目录设置

//  localhost:端口号/api 路径路由定义
var apiRoutes = express.Router();

apiRoutes.use(function(req, res, next) {
    // 拿取token 数据 按照自己传递方式写
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        let secretOrPrivateKey="wspjwt";// 这是加密的key（密钥）
        // 解码 token (验证 secret 和检查有效期（exp）)
        jwt.verify(token, secretOrPrivateKey, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: '无效的token.' });
            } else {
                // 如果验证通过，在req中写入解密结果
                req.decoded = decoded;
                //console.log(decoded)  ;
                next(); //继续下一步路由
            }
        });
    } else {
        console.log("没有找到token");
        // 没有拿到token 返回错误
        return res.status(403).send({
            success: false,
            message: '没有找到token.'
        });

    }
});


//路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users', infoRouter);
app.use('/users', loginRouter);
app.use('/uploader', uploadRouter);
app.use('/home', homeRouter);
app.use('/news', newsRouter);
app.use('/seo', seoRouter);
app.use('/aboutUs', aboutUsRouter);
app.use('/products', productsRouter);
app.use('/feedBack', feedBackRouter);
app.use('/knowledge', knowledgeRouter);


//捕获404并转发到错误处理程序
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理程序
app.use(function(err, req, res, next) {
  // 设置局部变量，只提供开发中的错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 呈现错误页
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
