var express = require('express');
var router = express.Router();

//导入mysql模块
const mysql = require('mysql');
const dbConfig = require('../db/DBconfig');
const seoSQL = require('../db/sql/SeoSQL');
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
    router.get('/getAllSEO',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        // console.log("连接成功")
        conn.query(seoSQL.getAllSEO,(err,result)=>{
            console.log(result);
            if(result && result.length !== 0){
                result = {
                    err_code:0,
                    message:'查询成功',
                    seoList:result,
                    affectedRows:0
                }
            }
            if(result === undefined || result.length === 0){
                result = {
                    err_code:1,
                    message:"数据为空",
                    seoList:result,
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

/**
 * 需要前端传参列表
 * {
 *    title:'',
 *    type:'',
 *    content:'',
 *    imgUrl:'',
 *    createTime:''
 * }
 * 添加数据 ps:调用api 时需要加上app.js中的定义的路由路径
 */
router.post('/addSEO',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        //获取客户端传过来的参数
        const news = req.body;
        console.log(req.body)
        conn.query(seoSQL.addSEO,news,(err,result)=>{
            //console.log(err);
            // console.log('result',result);
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

/**
 * 需要前端传参列表
 * {
 *    id:'',
 *    title:'',
 *    type:'',
 *    content:'',
 *    imgUrl:'',
 *    createTime:''
 * }
 * 修改数据 ps:调用api 时需要加上app.js中的定义的路由路径
 */
router.post('/updateSEOById',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{

        conn.query(seoSQL.updateSEOById,[req.body, req.body.id],(err,result)=>{
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

/**
 * 需要前端传参列表
 * {
 *    id:'',
 * }
 * 删除数据 ps:调用api 时需要加上app.js中的定义的路由路径
 */
router.post('/deleteSEOById',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        conn.query(seoSQL.deleteSEOsById,req.body.id,(err,result)=>{
            //console.log(err);
            //console.log('result',result);
            if(typeof result === 'undefined'||result.affectedRows !==1||err){
                result = {
                    err_code:1,
                    message:'删除失败',
                    affectedRows:0
                }
            }else{
                result = {
                    err_code:0,
                    message:"删除成功",
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
