{
    //参数默认值，注意：默认值参数的后面不能再有不赋默认值的参数，  notice !!!!!!
    function test(x,y = 'hello') {
        console.log(x,y);
    }
    test('Ivana');//Ivana hello
    test('Ivana','sql');//Ivana sql
}

{
    //作用域问题
    let x = 'aaa';
    function test1(x, y = x) {
        console.log(x,y);
    }
    test1('bbb');//控制台输出bbb bbb
    test1();//控制台输出undefined undefined

    function test2(c, y = x) {
        console.log(c,x,y);
    }
    test2();//undefined "aaa" "aaa"
    test2('bbb');//bbb aaa aaa
}

{
    //不确定参数个数时，将接收的参数都转为数组，与ES5的arguments有异曲同工之妙，但auguments[0]与此不同，表示
    //...args之后不能再有其它参数了，否则会混乱不清
    function test3(...args) {
        for(let rest of args){
            console.log(rest);
        }
    }
    test3(1,2,3,4,'a');
}

{
    //把数组拆成离散的值
    console.log(...[1,2,4]);
    console.log('a',...[1,2,4]);
}

{
    //箭头函数：三部分组成（函数名，函数参数，函数返回值），做箭头函数时注意this绑定，有时适合用箭头函数，有时不适合用
    let arrow = v => v*5;
    console.log(arrow(3));
    let arrow2 = () => 5;
    console.log(arrow2());
}
//
// {
//     //自行补充：箭头函数的this绑定问题，第一轮
//     let obj={
//         fn:function(){
//             console.log(this);
//         }
//     }
//     obj.fn();//obj本身，{fn: ƒ}
//
//     let obj1= {
//         fn: function () {
//             setTimeout(function () {
//                 console.log(this);
//             });
//         }
//     }
//     obj1.fn();//Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
//
//     let obj2={
//         fn:function(){
//             setTimeout(() => {
//                 console.log(this);
//             });
//         }
//     }
//     obj2.fn();//obj2本身，{fn: ƒ}
//
//     let obj3={
//         num:3,
//         fn:function(){
//             setTimeout(function(){
//                 console.log(this.num);
//             });
//         }
//     }
//     obj3.fn();//undefined
//
//     var obj4={
//         num:4,
//         fn:function(){
//             setTimeout(() => {
//                 console.log(this.num);
//             });
//         }
//     }
//     obj4.fn();//4
//
//     //自行补充：箭头函数的this绑定问题，第二轮嵌套函数，？？？？？？？？？？？？
//     let obj5={
//         num:4,
//         fn:function(){
//             let f=() => {
//                 console.log(this);//obj5
//                 setTimeout(() => {
//                     console.log(this);//obj5
//                 });
//             }
//             f();
//         }
//     }
//     obj5.fn();
//
//     // obj6的例子看到undefined undefined  ???????????????????????????
//
//
//     let obj7={
//         num:4,
//         fn:function(){
//             let f=() => {
//                 console.log(this); //obj7,f()定义在obj7对象中，this就指向obj7,这就是箭头函数this指向的关键
//                 setTimeout(function() {
//                     console.log(this);//window，非箭头函数的情况下还是要看宿主对象是谁，如果没有被对象调用，函数体中的this就绑定的window上
//                 });
//             }
//             f();
//         }
//     }
//     obj7.fn();
// }

{
    //尾调用，ES6中的新特性，某个函数的最后一步return时再调用另一个函数，它的功能特别强大；
    //尾调用的好处是：提升性能，比递归等节省资源，什么时候用伪调用，如果有嵌套调用，为了提升性能，建议写成伪调用的形式，
    // 尾递归优化只在严格模式下生效，非严格模式下需要自己实现尾递归优化。
    //不return不算尾调用，调用后有其它赋值操作也不算尾调用
    function tail(x) {
        console.log('tail',x);
    }
    function fx(x) {
        return tail(x);
    }
    fx(123);//tail 123

    //尾递归，实现阶乘，只保留一个调用栈（记录调用位置和内部变量等信息），不会产生栈溢出错误
    function tailFactorial(n, total) {
        if (n === 1) return total;
        return tailFactorial(n - 1, n * total);
    }
    function factorial(n) {
        return tailFactorial(n, 1);
    }
    console.log(factorial(3));//6
    console.log(factorial(4));//24
    console.log(factorial(5));//120
    // 利用默认值的方法不对，无法保存默认值处的 n * total 值：
    // function factorial1(n, total = 1) {
    //     console.log('n = ',n,'  ;t = ',total);
    //     if (n === 1) return total;
    //     return factorial(n - 1, n * total);
    // }
    // console.log(factorial1(3));//6
    // console.log(factorial1(4));//24
    // console.log(factorial1(5));//120
    //尾递归，实现斐波那契数列
    function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
        if( n <= 1 ) {return ac2};
        return Fibonacci2 (n - 1, ac2, ac1 + ac2);
    }
    // console.log(Fibonacci2(100)); // 573147844013817200000
    // console.log(Fibonacci2(1000)); //  7.0330367711422765e+208
    // Fibonacci2(10000) // Infinity
    // console.log(Fibonacci2(1));
    // console.log(Fibonacci2(2));
    // console.log(Fibonacci2(3));
    // console.log(Fibonacci2(4));
    // console.log(Fibonacci2(5));



}