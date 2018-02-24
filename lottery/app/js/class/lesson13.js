// {
//     //回调方式如下，但多层回调则会很混乱，不易维护，用Promise则可以链式操作
//     let ajax = function (callback) {//参数是函数
//         console.log('执行');
//         setTimeout(function () {
//             callback && callback.call();
//         },1000)
//     }
//     ajax(function () {
//         console.log('timeout1');//执行  --> timeout1
//     })
// }

// {
//     /**
//      * 构造函数Promise的参数是一个函数（暂时叫它func），这个函数（func）有两个参数resolve和reject，它们分别是两个函数，
//      * 这两个函数的作用就是将promise的状态从pending（等待）转换为resolved（已解决）
//      * 或者从pending（等待）转换为rejected（已失败）。
//      */
//     let ajax = function () {
//         console.log("执行2");
//         return new Promise(function (resolve,reject) {
//             setTimeout(function () {
//                 resolve()
//             },1000);
//         })
//     };
//     ajax().then(function () {
//         console.log('promise','timeout2');
//     })
// }
//
// {
//     let ajax = function () {
//         console.log("执行3");
//         return new Promise(function (resolve,reject) {
//             setTimeout(function () {
//                 resolve()
//             },1000);
//         })
//     };
//     ajax()
//         .then(function () {
//         return new Promise(function (resolve,reject) {
//             console.log("p2");
//             setTimeout(function () {
//                 resolve();
//             },1000);
//         })
//     })
//         .then(function () {
//             console.log('timeout3');
//         })
// }

// {
//     //关于线程切换的问题：？？？？？？？？？？？？？？？？？？？
//     let ajax = function (num) {
//         console.log("执行4");
//         return new Promise(function (resolve,reject) {
//             if(num > 4){
//                 resolve();
//             }else {
//                 throw new Error('出错了');
//             }
//         });
//     };
//     ajax(6).then(function () {
//         console.log('log',6);
//     }).catch(function (err) {
//         console.log('catch',err);
//     });
//     ajax(3).then(function () {
//         console.log('log',3);//这句不会打印
//     }).catch(function (err) {
//         console.log('catch',err);
//     })
// }

//
// {
//     /**
//      * Promise函数体的内部包裹着一个异步的请求或者操作或者函数；
//      * 我们可以在这个异步的操作完成的时候使用resolve函数将我们获得的结果传递出去，
//      * 或者使用reject函数将错误的消息传递出去。
//      */
//     let promise = new Promise((resolve,reject) => {
//         let flag = Math.random();
//         setTimeout(() => Math.random() ? resolve('success'):reject('fail'),1000);
//     })
//     console.log(promise);///在浏览器的控制台运行的话，它返回的是一个包含了许多属性的Promise对象；在Node.js环境中控制台输出 Promise { <pending> }
//     promise.then(result => console.log(result),err => console.log(err));//可能是fail也可能是success
//     /**
//      * Promise对象可以通过使用then方法将上一步返回的结果获取过来（不管是resolved还是rejected），
//      * 可以通过使用catch方法捕获Promise对象在使用catch之前的异常,
//      * catch 是then的特例：.then(null, rejection)。
//      */
// }

// {
//     //关于线程切换的问题？？？？？？？？？？？？？？？？？？？？
//     let p1 = new Promise((resolve, reject) => {
//         let flag = Math.random() > 0.5 ? true : false;
//         resolve();
//     });
//     //使用then方法进行链式的调用
//     p1
//         .then(() => {
//         return 1;
//     })
//         .then((result) => {
//         console.log(result);
//         return 'hello'
//     })
//         .then((result) => {
//         console.log(result);
//     });
//
//     //在then方法内部可以再次使用异步的操作
//     p1.then(() => {
//         console.log('******');
//         let p1 = new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(123);
//             }, 1000);
//         });
//         return p1;
//     }).then((result) => {
//         console.log(result);
//     });
// }

// {
//     let p = new Promise((resolve, reject) => {
//         resolve();
//     });
//     p.then(() => {
//         console.log('progress...');
//     }).then(() => {
//         throw new Error('fail');
//     }).catch((err) => {
//         console.log(err);
//     });
// }

// {
//     /**
//      * Promise.all方法用来包装许多个Promise实例，然后组成了一个新的Promise对象，
//      * 新的Promise对象的状态由前面几个被包裹的Promise对象的状态决定，
//      * 如果前面的Promise都被resolve了，那么新的Promise的状态也是resolve的；
//      * 只要有一个Promise被reject了，那么组成的新的Promise的状态也是reject的。
//      */
//     let arr = [1, 2, 3].map(
//         (value) => {
//             return new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     console.log(value);//先执行console.log(arr),输出(3) [Promise, Promise, Promise]，再输出value: 1,2,3
//                     resolve(value);
//                 }, value * 1000);
//             });
//         }
//     );
//
//     console.log(arr);//输出(3) [Promise, Promise, Promise]
//
//     let promises = Promise.all(arr)
//         .then((result) => {
//             console.log(result);//3s后输出，待以上三个任务都执行完毕，才会执行Promise.all.then中的方法，输出(3) [1, 2, 3]
//         }).catch((err) => {
//             console.log(err);
//         });
// }
//
// {
//     /**
//      * Promise.race方法和上面的Promise.all有点类似，都是包装许多的Promise对象，然后组成了一个新的Promise对象，
//      * 但是使用Promise.race的含义是：
//      * 只要包裹的的Promise对象中有一个的状态发生了改变，
//      * 那么组成的这个新的Promise对象的状态就是上面那个率先改变的Promise实例的状态。
//      */
//     let arr = [1, 2, 3].map(
//         (value) => {
//             return new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     console.log('value:',value);
//                     resolve(value);
//                 }, value * 3000);//改成1000 和改成 3000 不一样，是因为主线程结束了吗？？？？？？？？？
//             });
//         }
//     );
//
//     console.log(arr);
//
//     let promises = Promise.race(arr)
//         .then((result) => {
//             console.log(result);
//         }).catch((err) => {
//             console.log(err);
//         });
//     /**
//      * 输出：
//      * (3) [Promise, Promise, Promise]
//      * index.js:9781 value: 1
//      * index.js:9790 1
//      * index.js:9781 value: 2
//      * index.js:9781 value: 3
//      */
// }

// {
//     //Promise.resolve方法会将具有then方法的对象转换为一个Promise对象，然后就立即执行then方法。
//     let arr = [null, 0, 'hello',
//         { then: function() { console.log(' a thenable obj')}}
//     ];
//
//     arr.map((value) => {
//         return Promise.resolve(value);
//     });
//
//     console.log(arr);
// }

// {
//     /**
//      * Promise.reject方法和Promise.resolve方法一样，只不过通过Promise.reject方法产生的Promise对象的状态是rejected的，
//      * 即Promise.reject方法生成一个Promise对象，然后reject().
//      */
//     let p = Promise.reject('fail');
//     p.then(result=>console.log(result),err=>console.log(err));//fail
//     // p.catch((err) => {
//     //     console.log(err);
//     // }); // fail，这个p.catch是知乎上的，但应该不对，应该用then的第二个参数接受err并处理
// }

{
    function loadImg(src) {
        return new Promise((resolve,reject) => {
            let img = document.createElement('img');
            img.src = src;
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function (err) {
                reject(err);
            };
        });
    }

    function showImg(imgs) {
        imgs.forEach(function (img) {
           document.body.appendChild(img);
        });
    }

    Promise.all([
        loadImg('http://i4.buimg.com/56752/df1ef0720bea6832.png'),
        loadImg('http://i4.buimg.com/56752/2b07ee25b08930ba.png'),
        loadImg('http://i2.buimg.com/56752/5eb8190d6b2a1c9c.png')
    ]).then(showImg);

}

{
    function loadImg(src) {
        return new Promise((resolve,reject) => {
            let img = document.createElement('img');
            img.src = src;
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function (err) {
                reject(err);
            };
        });
    }

    function showImg(img) {
        let p = document.createElement('p');
        p.appendChild(img);
        document.body.appendChild(p);
    }

    Promise.race([
        loadImg('http://i4.buimg.com/56752/df1ef0720bea6832.png'),
        loadImg('http://i4.buimg.com/56752/2b07ee25b08930ba.png'),
        loadImg('http://i2.buimg.com/56752/5eb8190d6b2a1c9c.png')
    ]).then(showImg);

}