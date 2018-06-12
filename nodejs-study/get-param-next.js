var express = require('express')
var app = express()
var superagent = require('superagent')


app.get('/a', function(req, res, next) {
    res.send('sucess');
    next();
    /**
     * next函数主要是用来确保所有注册的中间件被一个接一个的执行，那么我们就应该在所有的中间件中调用next函数，
     * 但有一个特例，如果我们定义的中间件终结了本次请求，那就不应该再调用next函数，否则就可能会出问题。
     * 
     * 在res.send之后调用了next函数，虽然我们本次的请求已经被终止，但后边的404中间件依旧会被执行，
     * 而后边的中间件试图去向res的headers中添加属性值，所以就会抛出上边的异常。
     */
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(404);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000, () => console.log('app is running at port 3000 ...'))

/**
 * 参考文献：
 * https://www.cnblogs.com/aishangliming/p/6115359.html
 */