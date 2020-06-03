//1,安装驱动，在项目目录下 nmp install mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    port: '3306',
    user:'root',
    password:'123456',
    database:'nodejsstudy'
});

connection.connect();

connection.query('SELECT 1+1 AS solution',function (error,results,fields) {
    if(error) throw error;
    console.log('The solution is:',results[0].solution);
    if(results[0].solution === 2){
        console.log('connection is success');
    }
});

document.querySelector("#id").classList.add();

