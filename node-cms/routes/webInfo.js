var express = require('express');
var router = express.Router();

//导入mysql模块
const mysql = require('mysql');
const dbConfig = require('../db/DBconfig');
const infoSqlStr = require('../db/sql/info');
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

/*根据id查询英雄数据 ps:调用api 时需要加上app.js中的定义的路由路径 */
router.get('/getInfoById',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        //获取页面传过来的参数
        const id = req.query.id;
        conn.query(infoSqlStr.getInfoById,id,(err,result)=>{
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

/*修改数据 */
router.post('/updateInfo',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        conn.query(infoSqlStr.updateInfo,[req.body,req.body.id],(err,result)=>{
            console.log(req.body);
            // console.log('result',result);
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

/*修改数据 */
router.post('/updateLogo',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        conn.query(infoSqlStr.updateLogo,[req.body.logoUrl,req.body.id],(err,result)=>{
            console.log(req.body);
            // console.log('result',result);
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

module.exports = router;
