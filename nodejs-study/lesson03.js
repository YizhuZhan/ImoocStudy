var express = require('express')
var app = express()
var superagent = require('superagent')
var cheerio = require('cheerio')
var querystring = require('querystring')
var url = require('url')



app.get('/', (req, res, next) => {
    superagent.get('https://cnodejs.org/').end((err, sres) => {
        if(err) {
            return next(err)
        }
        var items = []
        var $ = cheerio.load(sres.text)
        var topics = $('#topic_list .topic_title')
        var authors = $('#topic_list .user_avatar img')//作者信息在头像图片的title里
        topics.each((index, element) => {
            var $element = $(element)
            var title = $element.attr('title')
            var hostname = 'https://cnodejs.org/'
            var href = url.resolve(hostname, $element.attr('href'))
            var author = $(authors[index]).attr('title')
            items.push({
                'title': title,
                'href': href,
                'author': author
            })
        })
        res.send(items)
    })
})


app.listen(3000, () => console.log('app is running at port 3000 ...'))