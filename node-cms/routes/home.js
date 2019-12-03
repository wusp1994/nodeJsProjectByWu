var express = require('express');
var router = express.Router();

//导入mysql模块
const mysql = require('mysql');
const dbConfig = require('../db/DBconfig');
const homeSqlStr = require('../db/sql/HomeSQL');
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
/**
 * 需要前端传参列表
 * {
 *    imgUrl:'',
 *    type:'',//此参数需要由前端决定,与查询时一一对应 banner,news,aboutUs
 * }
 * 添加数据 ps:调用api 时需要加上app.js中的定义的路由路径
 */
router.post('/addHome',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        //获取客户端传过来的参数
        const homObj = req.body;
        conn.query(homeSqlStr.addHome,homObj,(err,result)=>{
            //console.log(err);
            console.log('result',result);
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
 *    imgUrl:'',
 *    type:'',//此参数需要由前端决定,与查询时一一对应 banner,news,aboutUs
 * }
 * 修改数据
 */
router.post('/updateHome',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        conn.query(homeSqlStr.updateHome,[req.body, req.body.id],(err,result)=>{
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
 *    type:'',//此参数需要由前端决定,与查询时一一对应 banner,news,aboutUs
 * }
 * 删除数据 ps:调用api 时需要加上app.js中的定义的路由路径
 */
router.post('/deleteHomeById',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        console.log(req.body.id);
        console.log(req.body.type);
        conn.query(homeSqlStr.deleteHomeById,[req.body.id,req.body.type],(err,result)=>{
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

/**
 * 获取所有 轮播列表
 * 需要前端传参列表
 * {
 *    type:'',//此参数需要由前端决定,与上传时一一对应 banner,news,aboutUs
 * }
 * ps:调用api 时需要加上app.js中的定义的路由路径
 */
router.get('/getHomeList',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        let type = req.query.type;
        console.log(type);
        conn.query(homeSqlStr.getHomeList,type,(err,result)=>{
            console.log(result);
            if(result){
                result = {
                    err_code:0,
                    message:"查询成功",
                    data:result,
                    affectedRows:0
                }
            }else{
                result = {
                    err_code:1,
                    message:"暂无数据",
                    data:''
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
