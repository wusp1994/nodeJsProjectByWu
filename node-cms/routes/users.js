var express = require('express');
var router = express.Router();

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
/* 获取所有用户 ps:调用api 时需要加上app.js中的定义的路由路径 */
router.get('/getUsers',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        console.log("连接成功")
        conn.query(userSQL.getAllUser,(err,result)=>{
            console.log(result);
            if(result){
                result = {
                    err_code:0,
                    message:result,
                    affectedRows:0
                }
            }
            //解析成json格式
            responseJSON(res,result);
            //释放连接
            conn.release();
        })
    });
});

/*根据id查询英雄数据 ps:调用api 时需要加上app.js中的定义的路由路径 */
router.get('/getUserById',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        //获取页面传过来的参数
        const id = req.query.id;
        conn.query(userSQL.getUserById,id,(err,result)=>{
            console.log(result);
            if(result.length !==1){
                result = {
                    err_code:1,
                    message:'数据不存在',
                    affectedRows:0
                }

            }else{
                result = {
                    err_code:0,
                    message:result[0],
                    affectedRows:0
                }
            }
            //解析成json格式
            responseJSON(res,result);
            //释放连接
            conn.release();
        })
    });
});

/*添加数据 ps:调用api 时需要加上app.js中的定义的路由路径 */
router.post('/addUser',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        //获取客户端传过来的参数
        const user = req.body;
        console.log(user);
        conn.query(userSQL.addUser,user,(err,result)=>{
            //console.log(err);
            //console.log('result',result);
            if(typeof result === 'undefined'||result.affectedRows !==1||err){
                result = {
                    err_code:1,
                    message:'添加失败',
                    affectedRows:0
                }
            }else{
                result = {
                    err_code:0,
                    message:"添加成功",
                    affectedRows:result.affectedRows
                }
            }
            //解析成json格式
            responseJSON(res,result);
            //释放连接
            conn.release();
        })
    });
});

/*修改数据 */
router.post('/updateUser',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        conn.query(userSQL.updateUser,[req.body, req.body.id],(err,result)=>{
            //console.log(err);
            //console.log('result',result);
            if(typeof result === 'undefined'||result.affectedRows !==1||err){
                result = {
                    err_code:1,
                    message:'修改失败',
                    affectedRows:0
                }
            }else{
                result = {
                    err_code:0,
                    message:"修改成功",
                    affectedRows:result.affectedRows
                }
            }
            //解析成json格式
            responseJSON(res,result);
            //释放连接
            conn.release();
        })
    });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
