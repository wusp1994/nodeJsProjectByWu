var express = require('express');
var router = express.Router();

//导入mysql模块
const mysql = require('mysql');
const dbConfig = require('../db/DBconfig');
const productsSqlStr = require('../db/sql/ProductsSQL');
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
/* 获取所有未删除数据总数 */
router.get('/getAllProductsNumber',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        // console.log("连接成功")
        conn.query(productsSqlStr.getAllProductsNumber,(err,result)=>{
            // console.log(result[0].allCount);
            let allCount = -1;
            if(result[0].allCount){
                allCount = result[0].allCount;
            }
            if(result && result.length !== 0){
                result = {
                    err_code:0,
                    message:'查询成功',
                    data:allCount,
                }
            }
            if(result === undefined || result.length === 0){
                result = {
                    err_code:1,
                    message:"数据为空",
                    data:allCount,
                }
            }
            //解析成json格式
            responseJSON(res,result);
            //释放连接
            conn.release();
        })
    });
});
/* 获取所有用户 ps:调用api 时需要加上app.js中的定义的路由路径 */
router.get('/getAllProducts',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        // console.log("连接成功")
        let startSize = Number(req.query.startSize);
        let pageSize = Number(req.query.pageSize);
        // console.log(startSize,"req.body.startSize")
        conn.query(productsSqlStr.getAllProducts,[startSize,pageSize],(err,result)=>{
            // console.log(result);
            if(result && result.length !== 0){
                result = {
                    err_code:0,
                    message:'查询成功',
                    list:result,
                    affectedRows:0
                }
            }
            if(result === undefined || result.length === 0){
                result = {
                    err_code:1,
                    message:"数据为空",
                    list:result,
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


/* 获取所有用户 ps:调用api 时需要加上app.js中的定义的路由路径 */
router.get('/getProductsById',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        // console.log("连接成功")
        conn.query(productsSqlStr.getProductsById,req.query.id,(err,result)=>{
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

/* 获取所有未删除数据总数 */
router.get('/getAllProductsByTypeNumber',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        // console.log("连接成功")
        conn.query(productsSqlStr.getAllProductsByTypeNumber,req.query.productsType,(err,result)=>{
            // console.log(result[0].allCount);
            let allCount = -1;
            if(result[0].allCount){
                allCount = result[0].allCount;
            }
            if(result && result.length !== 0){
                result = {
                    err_code:0,
                    message:'查询成功',
                    data:allCount,
                }
            }
            if(result === undefined || result.length === 0){
                result = {
                    err_code:1,
                    message:"数据为空",
                    data:allCount,
                }
            }
            //解析成json格式
            responseJSON(res,result);
            //释放连接
            conn.release();
        })
    });
});

/* 获取所有用户 ps:调用api 时需要加上app.js中的定义的路由路径 */
router.get('/getAllProductsByType',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        let startSize = Number(req.query.startSize);
        let pageSize = Number(req.query.pageSize);
        // console.log("连接成功")
        conn.query(productsSqlStr.getAllProductsByType,[req.query.productsType,startSize,pageSize],(err,result)=>{
            console.log(result);
            if(result && result.length !== 0){
                result = {
                    err_code:0,
                    message:'查询成功',
                    list:result,
                    affectedRows:0
                }
            }
            if(result === undefined || result.length === 0){
                result = {
                    err_code:1,
                    message:"数据为空",
                    list:result,
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
router.post('/addProducts',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        //获取客户端传过来的参数
        // console.log(req.body)
        conn.query(productsSqlStr.addProducts,req.body,(err,result)=>{
            console.log(err);
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
router.post('/updateProductsById',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        console.log('body',req.body);
        conn.query(productsSqlStr.updateProductsById,[req.body, req.body.id],(err,result)=>{
            console.log(err);
            console.log('result',result);
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
router.post('/deleteProductsById',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        conn.query(productsSqlStr.deleteProductsById,req.body.id,(err,result)=>{
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

//===================产品类型===============================

/* 获取所有产品类型 ps:调用api 时需要加上app.js中的定义的路由路径 */
router.get('/getAllProductsType',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        // console.log("连接成功")
        conn.query(productsSqlStr.getAllProductsType,(err,result)=>{
            console.log(result);
            if(result && result.length !== 0){
                result = {
                    err_code:0,
                    message:'查询成功',
                    list:result,
                    affectedRows:0
                }
            }
            if(result === undefined || result.length === 0){
                result = {
                    err_code:1,
                    message:"数据为空",
                    list:result,
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
 *   typeDescribe:''
 * }
 * 添加数据 ps:调用api 时需要加上app.js中的定义的路由路径
 */
router.post('/addProductsType',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        //获取客户端传过来的参数
        const news = req.body;
        console.log(req.body)
        conn.query(productsSqlStr.addProductsType,news,(err,result)=>{
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
 *   id:'',
 *   typeDescribe:''
 * }
 * 修改数据 ps:调用api 时需要加上app.js中的定义的路由路径
 */
router.post('/updateProductsTypeById',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        conn.query(productsSqlStr.updateProductsTypeById,[req.body, req.body.id],(err,result)=>{
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
router.post('/deleteProductsTypeById',(req, res, next)=>{
    //从连接池中获取连接
    pool.getConnection((error,conn)=>{
        conn.query(productsSqlStr.deleteProductsTypeById,req.body.id,(err,result)=>{
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
