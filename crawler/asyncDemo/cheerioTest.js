var cheerio = require('cheerio')
var $ = cheerio.load('<h2 class="title">Hello world</h2>')

$('h2.title').text('Hello there!')
$('h2').addClass('welcome')

console.log($.text())
//=> <h2 class="title welcome">Hello there!</h2>