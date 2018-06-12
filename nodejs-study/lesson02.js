var express = require('express')
var utility = require('utility')
var app = express()

app.get('/',function(req,res){
	var q = req.query.q
	var md5value = utility.md5(q)
	var sha1value = utility.sha1(q)
	res.send(sha1value)
})

app.listen(3000,function(){
	console.log('app is running at port 3000...')
})