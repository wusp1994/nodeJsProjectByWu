const express = require('express');
const app = express();
app.listen(5000,()=>{
    console.log('http://127.0.0.1:5000')
})
//创建数据连接
const mysql = require('mysql')
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'test'
})
//注册 解析表单的 body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended:false
}))
//获取所有英雄数据
app.get('/api/getHeroes',(req,res)=>{
   //定义sql语句,查询所有
    const sqlStr = 'select * from text where isdel=0'
    conn.query(sqlStr,(err,results)=>{
        console.log(results)
        if(err) return res.json({err_code:1,message:'获取失败',affectedRows:0})
        res.json({
            err_code:0,
            message:results,
            affectedRows:0
        })
    })
})
//根据id查询英雄数据
app.get('/api/getHero',(req,res)=>{
    const id = req.query.id;
    const sqlStr = 'select * from text where id=?'
    conn.query(sqlStr,id,(err,results)=>{
        if(err) return res.json({err_code:1,message:'获取失败',affectedRows:0})
        if(results.length !==1) return res.json({err_code:1,message:'数据不存在',affectedRows:0})
        res.json({
            err_code:0,
            message:results[0],
            affectedRows:0
        })
    })
})
//根据id 删除英雄
app.get('/api/delHero',(req,res)=>{
    const id = req.query.id;
    const sqlStr = 'update text set isdel = 1 where id=?'
    conn.query(sqlStr,id,(err,results)=>{
        if(err) return res.json({err_code:1,message:'删除失败',affectedRows:0})
        if(results.affectedRows !== 1) return res.json({err_code:1,message:'删除失败',affectedRows:0})
        res.json({
            err_code:0,
            message:'删除成功',
            affectedRows:results.affectedRows
        })
    })
})
//添加数据
app.post('/api/addHero',(req,res)=>{
    const hero = req.body;
    console.log(hero);

    const sqlStr = 'insert into text set ?'
    conn.query(sqlStr,hero,(err,results)=>{
        if(err) return res.json({err_code:1,message:'添加失败',affectedRows:0})
        if(results.affectedRows !== 1) return res.json({err_code:1,message:'添加失败',affectedRows:0})
        res.json({
            err_code:0,
            message:'添加成功',
            affectedRows:results.affectedRows
        })
    })
})

//修改数据
app.post('/api/updateHero',(req,res) => {
    const sqlStr = 'update text set ? where id = ?'
    conn.query(sqlStr, [req.body, req.body.id], (err, results) => {
        if (err) return res.json({err_code: 1, message: '更新英雄失败', affectedRows: 0})
        //影响行数不等于1
        if (results.affectedRows !== 1) return res.json({err_code: 1, message: '更新的英雄不存在', affectedRows: 0})
        res.json({
            err_code: 0,
            message: '更新成功',
            affectedRows: results.affectedRows
        })
    })
})