var querystring = require('querystring')
var queryObj = {
    'from': 'scott',
    'course': ['node', 'jade'],
    'name': ''
}
var combine1 = ','//用于代替query中的连接符'&'
var combine2 = ':'//用于代替query每一个参数中的':'

console.log(querystring.stringify(queryObj))
console.log(querystring.stringify(queryObj, combine1))
console.log(querystring.stringify(queryObj, combine1, combine2))

var queryStr = 'from=scott&course=node'
console.log(querystring.parse(queryStr))

var charactors = '哈哈'
console.log(querystring.escape(charactors))//%E5%93%88%E5%93%88
var code = '%E5%93%88%E5%93%88'
console.log(querystring.unescape(code))//哈哈
