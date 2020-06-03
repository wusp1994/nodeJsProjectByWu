//================================创建文件=======================
var fs = require("fs")

/**
 * 方式一
 * 创建文件写入内容,如果以存在会覆盖掉
 * writeFile("文件名称","文件内容",回调函数) 异步方法
 */
fs.writeFile("1.txt","我是一个txt文件1",function(error){
  if(error){
    console.log("报错")
  }else{
    console.log("写入成功")
  }
})

/**
 * 方式二
 * 追加内容.如果文件已存在,则追加内容;若文件不存在,创建文件并写入内容
 * appendFile("文件名称","文件内容",回调函数)  异步方法
 */
fs.appendFile("2.txt","我是追加的字符",function(err){
  if(err) {
    return console.log(err);
  }else{
    console.log("追加成功");
  }
})

/**
 * 方式三
 * 创建文件写入内容,如果以存在会覆盖掉
 * writeFileSync("文件名称","文件内容")  同步方法
 */
fs.writeFileSync("3.txt","writeFileSync写入内容")

//================================读取文件=======================
fs.readFile("1.txt",function (err,data) {
  if(err){
    console.log(err)
  }else{
    console.log(data.toString())
  }
})

//================================修改文件名称=======================
fs.rename("1.txt","3.txt",function (err) {
  if(err){
    console.log(err)
  }else{
    console.log("修改成功")
  }
})