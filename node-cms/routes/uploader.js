//服务端代码，用来处理 单 文件上传请求
var express = require('express');
var router = express.Router();
var multer  = require('multer');
var fs = require('fs');

// 创建文件夹
var createFolder = function(folder){
    try{
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder);
    }catch(e){
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }
};
var uploadFolder = __dirname + "/../" + '/uploadFolder/';

createFolder(uploadFolder);

var storage = multer.diskStorage({
    // 如果你提供的 destination 是一个函数，你需要负责创建文件夹
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, uploadFolder);
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        let Suffix = file.originalname.split(".")[1];
        cb(null, "img-" + Date.now() + '.' + Suffix);
    }
});
var upload = multer({
    storage: storage
});


// 单图上传
// myFile 与表单中的input name 属性相对应
router.post('/upload', upload.single('myFile'), function(req, res, next){
    var file = req.file;
    let path = file.path;
    // console.log('文件类型：%s', file.mimetype);
    // console.log('原始文件名：%s', file.originalname);
    // console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    // console.log(req.file)//req.file文件的具体信息
    if(file !== null && file !== undefined){
        res.send({
            file:file,
            err_code:0
        });
    }else{
        res.send({
            file:file,
            err_code:1
        });
    }

});

// 单图上传
// myFile 与表单中的input name 属性相对应
router.post('/uploadExcel', upload.single('myFileExcel'), function(req, res, next){
    var file = req.file;
    let path = file.path;
    let id = req.body.id;
    let age = req.body.age;
    // console.log('文件类型：%s', file.mimetype);
    // console.log('原始文件名：%s', file.originalname);
    // console.log('文件大小：%s', file.size);
    // console.log('文件保存路径：%s', file.path);
    // console.log(req.file)//req.file文件的具体信息
    console.log(req)
    if(file !== null && file !== undefined){
        res.send({
            file:file,
            id:id,
            age:age,
            err_code:0
        });
    }else{
        res.send({
            file:file,
            err_code:1
        });
    }

});

module.exports = router;


