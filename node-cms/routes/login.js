var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');  //用来生成token

//导入mysql模块
const mysql = require('mysql');
const dbConfig = require('../db/DBconfig');
const userSQL = require('../db/sql/UserSQL');
//使用 DBconfig.js 的配置信息创建一个mysql 连接池
const pool = mysql.createPool(dbConfig.mysql);

//自定义函数，而定义响应json类型
const responseJSON = (res,result)=>{
    if(typeof result === 'undefined' ){
        res.json({err_code:1,message:'操作失败',affectedRows:0})
    }else {
        res.json(result)
    }
};

/*ps:调用api 时需要加上app.js中的定义的路由路径 */
router.post('/login',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        //req.body 是 post 传过来的参数
        const UserName =  req.body.userName;
        const Password = req.body.password;
        conn.query(userSQL.getLoginInfo,[UserName, Password],(err,result)=>{
            if(result.length !==1){
                result = {
                    err_code:1,
                    message:'登录失败',
                    token:'',
                    affectedRows:0,
                }
            }else{
                let content = {name:result.userName}; // 自定义要生成token的主题信息
                let secretOrPrivateKey= 'wspjwt';// 这是加密的key（密钥）
                /*这个 sign 方法需要三个参数：
                playload：签发的 token 里面要包含的一些数据。
                secret：签发 token 用的密钥，在验证 token 的时候同样需要用到这个密钥。
                options：一些其它的选项。*/
                let token = jwt.sign(content, secretOrPrivateKey, {
                    expiresIn: 60 * 60 * 24 ,  // 1小时过期,单位是 s
                });
                result = {
                    err_code:0,
                    message:"登录成功",
                    userName:result.userName,
                    niName:result.niName,
                    token:token,
                    affectedRows:0
                }
            }
            console.log(result);
            //解析成json格式
            responseJSON(res,result);
            //释放连接
            conn.release();
        })
    });
});

router.get('/getUserInfo',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        const UserName =  'admin';
        const userToken =  req.query.token;
        conn.query(userSQL.getUserInfo,UserName,(err,result)=>{
            if(result){
                result = {
                    err_code:0,
                    message:"成功",
                    affectedRows:0,
                    access: ['super_admin', 'admin'],
                    avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png',
                    userName: 'super_admin',
                }
            }
            //解析成json格式
            responseJSON(res,result);
            //释放连接
            conn.release();
        })
    });
});

/*router.get('/getUserInfo',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        console.log("连接成功")
        conn.query(userSQL.getLoginInfo,[UserName,'123456'],(err,result)=>{
            //req.query 是 页面 get 传过来的参数
            console.log(req.query.token);
            const userToken =  req.query.token;
            const UserName =  'admin';
            let secretOrPrivateKey="wspjwt";// 这是加密的key（密钥）
            jwt.verify(userToken, secretOrPrivateKey, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: '无效的token.' });
                } else {
                    // 如果验证通过，在req中写入解密结果
                    console.log(decoded);
                    next(); //继续下一步路由
                }
            });
            if(result.length !==1){
                result = {
                    err_code:1,
                    message:'数据不存在',
                    affectedRows:0
                }

            }else{
                result = {
                    err_code:0,
                    message:"成功",
                    affectedRows:0,
                    access: ['super_admin', 'admin'],
                    avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png',
                    userName: 'super_admin',
                }
            }
            //解析成json格式
            responseJSON(res,result);
            //释放连接
            conn.release();
        })
    });
});*/


module.exports = router;