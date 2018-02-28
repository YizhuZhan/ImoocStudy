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

    /**
     * 在 JavaScript 函数调用时我们往往会使用内置的 arguments 对象来获取函数的调用参数，不过这种方式却存在着很多的不方便性。
     * 譬如 arguments 对象是 Array-Like 对象，无法直接运用数组的 .map() 或者 .forEach() 函数；
     * 并且因为 arguments 是绑定于当前函数作用域，如果我们希望在嵌套函数里使用外层函数的 arguments 对象，我们还需要创建中间变量。
     *
     * ES6 中为我们提供了 Rest Operator 来以数组形式获取函数的调用参数，Rest Operator 也可以用于在解构赋值中以数组方式获取剩余的变量：
     */
    function outerFunction() {
        // store arguments into a separated variable
        var argsOuter = arguments;
        function innerFunction() {
            // args is an array-like object
            var even = Array.prototype.map.call(argsOuter, function(item) {
                // do something with argsOuter
            });
        }
    }

    function countArguments(...args) {
        return args.length;// get the number of arguments
    }
    countArguments('welcome', 'to', 'Earth'); //3

    //典型的 Rest Operator 的应用场景譬如进行不定数组的指定类型过滤：
    function filter(type, ...items) {
        return items.filter(item => typeof item === type);//数组 items 过滤，返回满足条件的 item 数组
    }
    console.log(filter('boolean',true,0,1,false));//(2) [true, false]
    console.log(filter('number',true,0,1,false,'welcome'));//(2) [0, 1]

    /**
     * 尽管 Arrow Function 中并没有定义 arguments 对象，但是我们仍然可以使用 Rest Operator 来获取 Arrow Function 的调用参数：
     * tips: 数组的 reduce() 方法，非es6 特有方法， js 方法
     */
    (function () {
        let outerArguments = arguments;
        //模拟concat函数
        const concat = (...items)  => {
            console.log(arguments === outerArguments);//true
            return items.reduce(((result,nextItem) => result + nextItem),'');
        }
        console.log(typeof concat(1,5,'nine'),concat(1,5,'nine'));//string 15nine
    })();
}

{
    //把数组拆成离散的值，Spread Operator
    console.log(...[1,2,4]);
    console.log('a',...[1,2,4]);
    /**
     * Spread Operator 则与 Rest Opeator 的功能正好相反，其常用于进行数组构建与解构赋值，
     * 也可以用于将某个数组转化为函数的参数列表，其基本使用方式如下：
     */
    let cold = ['autumn','winter'];
    let warm = ['spring','summer'];
    console.log([...cold,...warm]);//(4) ["autumn", "winter", "spring", "summer"]

    //我们也可以使用 Spread Operator 来简化函数调用：
    class King{
        constructor(name, country){
            this.name = name;
            this.country = country;
        }
        getDescription(){
            return `${this.name} leads ${this.country}`;
        }
    }
    let details = ['Alexander the Great', 'Greece'];
    let king = new King(...details);
    console.log(king.getDescription());

    //下面方法报错，不支持
    //还有另外一个好处就是可以用来替换 Object.assign 来方便地从旧有的对象中创建新的对象，并且能够修改部分值；譬如：
    let obj = {a:1,b:2};
    let obj_new_1 = Object.assign({},obj,{a:3});//{a:3,b:2}
    // let obj_new_2 = {
    //     ...obj,
    //     a:3
    // }//报错，不支持
    console.log(obj_new_1);
    // console.log(obj_new_2);
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