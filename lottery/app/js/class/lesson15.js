// {
//     //ES6 中的高级部分
//     let tell = function *() {
//         yield 'a';
//         yield 'b';
//         return 'c';
//     }
//     let k = tell();
//     console.log(k.next());//{value: "a", done: false}
//     console.log(k.next());//{value: "a", done: false}
//     console.log(k.next());//{value: "a", done: false}
//     console.log(k.next());//{value: undefined, done: true}
// }

// {
//     //ES6 中的高级部分，重点理解下面的顺序步骤
//     let tell = function *() {
//         yield console.log("第一个yield");
//         yield console.log("第二个yield");
//         return console.log("第三个yield");
//     }
//     let k = tell();
//     // console.log(k);//_invoke: ƒ invoke(method, arg)__proto__: Generator
//     console.log("第一个next开始",k.next(),"第一个next结束");
//     console.log("第二个next开始",k.next(),"第二个next结束");
//     console.log("第三个next开始",k.next(),"第三个next结束");
//     console.log("第四个next开始",k.next(),"第四个next结束");
//
//     /**
//      * 输出如下：
//      * 第一个yield
//      * 第一个next开始 {value: undefined, done: false} 第一个next结束
//      * 第二个yield
//      * 第二个next开始 {value: undefined, done: false} 第二个next结束
//      * 第三个yield
//      * 第三个next开始 {value: undefined, done: true} 第三个next结束
//      * 第四个next开始 {value: undefined, done: true} 第四个next结束
//      */
//
// }


// {
//     // let obj = {};
//     // obj[Symbol.iterator] = function *() {
//     //     yield 1;
//     //     yield 2;
//     //     return 3;
//     // }
//     // for(let key of obj){
//     //     console.log(key);//输出1,2
//     // }
//
//     let obj = {};
//     obj[Symbol.iterator] = function *() {
//         yield 1;
//         yield 2;
//         yield 3;
//     }
//     for(let key of obj){
//         console.log(key);//输出1,2,3
//     }
// }


//
// {
//     //Generator特别有优势的地方：状态机
//     let state = function *() {
//         while (1){
//             yield 'A';
//             yield 'B';
//             yield 'C';
//         }
//     }
//     let status = state();
//     console.log(status.next());//{value: "A", done: false}
//     console.log(status.next());//{value: "B", done: false}
//     console.log(status.next());//{value: "C", done: false}
//     console.log(status.next());//{value: "A", done: false}
//     console.log(status.next());//{value: "B", done: false}
//
// }


// {
//     //同上，async 和 await只是ES6的语法糖，运行下面代码需要安装babel的一些插件，此处暂不运行
//     let state = async function() {
//         while (1){
//             await 'A';
//             await 'B';
//             await 'C';
//         }
//     }
//     let status = state();
//     console.log(status.next());//{value: "A", done: false}
//     console.log(status.next());//{value: "B", done: false}
//     console.log(status.next());//{value: "C", done: false}
//     console.log(status.next());//{value: "A", done: false}
//     console.log(status.next());//{value: "B", done: false}
//
// }

//
// {
//     //实例 1 ： 抽奖剩余逻辑，前端和服务端都要做限制，下面是前端限制逻辑：
//     let draw = function (count) {
//         //具体的抽奖业务逻辑
//         console.log(`剩余抽奖次数${count}`);
//     }
//
//     let totalRest = function* (count) {
//         console.log('in generator');
//         while (count > 0){
//             console.log('in while');
//             yield count--;//用while就可以实现循环了，而用Generator的原因是可以不把剩余次数保存在全局变量中，而用yield
//             console.log('before draw');
//             draw(count);
//             console.log('after draw');
//         }
//     }
//
//     let rest = totalRest(5);
//
//     let btn = document.createElement('button');
//     btn.id = 'draw';
//     btn.textContent = '抽奖';
//     document.body.appendChild(btn);
//
//     document.getElementById('draw').addEventListener('click',function(){
//         rest.next();
//     },false);
// }

{
    //实例 2 ： 服务端数据定期变化，前端需要定期向服务端取数据，HTTP无状态，如何实时取到服务端的变化数据，有两种方式：
    //(1).长轮寻，可以通过定时器不断访问一个接口，也可以用Generator把代码变得更优雅，分离开；(2)websocket,但websocket浏览器兼容性不好
    let ajax = function *() {
        yield new Promise((resolve,reject) => {
            setTimeout(function() {
                resolve({code: 0})
            },200);
        });
    }
    let pull = function () {
        let generator = ajax();
        let step = generator.next();
        // console.log(step);//{value: Promise, done: false}
        step.value.then(function (d) {
            if(d.code !=0){
                setTimeout(function () {
                    console.log('wait');
                    pull();
                },1000);
            }else {
                console.log(d);
            }
        })
    }
    pull();
}

{
    //Generator 结合数组解构，见 Lesson02
    //注意，数组解构赋值的模式同样适用于任意迭代器，重点！！！ 可以结合 Lesson 15 学习：
    function* fibs() {
        var a = 0;
        var b = 1;
        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    }
    var [first, second, third, fourth, fifth, sixth] = fibs();
    console.log(first);//a = 0, b = 1
    console.log(second);//a = 1, b = 1
    console.log(third);//a = 1, b=  2
    console.log(fourth);//a = 2, b = 3
    console.log(fifth);//a = 3, b = 5
    console.log(sixth);//a = 5, b = 8

}