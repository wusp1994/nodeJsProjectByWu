const superagent = require('superagent') //superagent模块用来请求
const cheerio = require('cheerio') //页面分析模块
const async = require('async')
const request = require('request');
const fs = require('fs')

let requestUrl = "https://jingyan.baidu.com/article/93f9803f1f44e9e0e46f5595.html"
console.log(requestUrl)

/**
 * @description 使用 superagent 发起请求
 * @param url
 * @returns {*} 获取请求返回
 */
function getHtml(url){
    return superagent('GET',url).then(res=> res )
}

/**
 * @description 爬取图片，使用 cheerio
 * @param url
 * @returns {Promise<void>}
 */
async function imageCrawler(url){
    let res = await getHtml(url)
    //cheerio的dom操作，和jQuery几乎是一致的
    let $ = cheerio.load(res.text)
    $('img').each((index,item)=>{
        let imgUrl = item.attribs.src
        if(imgUrl.slice(0,2) === '//'){ imgUrl = imgUrl.slice(2); }
        let name = imgUrl.split('/')[imgUrl.split('/').length - 1];
        if(imgUrl.slice(0,1) !== '/' ){
            savedImg(imgUrl,name,function () {
                console.log(name + 'upload 完成');
            })
            console.log(imgUrl)
        }
    })
   
}

/**
 * @description 创建文件夹
 * @param dirname 文件夹名称
 * @returns {boolean}
 */
function mkdirSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
    return false
}

//保存图片
function savedImg(img_src,name = '',callback) {
    try{
        request.head(img_src);
        var writeStream = fs.createWriteStream('./image/'+name);
        var readStream = request({url: img_src, timeout: 15000})
        readStream.on('error',function () {
            console.log('done no');
        })
        .pipe(writeStream).on('close',callback);
    }
    catch(ex){
        console.log(ex);
        callback();
    }
}


imageCrawler(requestUrl)