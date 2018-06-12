var url = require('url')

//url.parse() 方法，用于将一个url地址字符串解析成一个对象
console.log(url.parse('http://imooc.com:8080/course/list?from=scott&course=node#floor1'))

//url.format() 方法，用于将一个对象解析成一个url地址字符串
var addr = {
    'protocol': 'http',
    'slashes': true,
    'host': 'imooc/com',
    'port': 8080,
    'pathname': 'course/list',
    'search': '?from=scott&course=node',
    'hash': '#floor1'
}
console.log(url.format(addr))

//url.resolve() 方法接收两个参数，第一个是首页地址，第二个是path
console.log(url.resolve('http://imooc.com', 'course/list'))

