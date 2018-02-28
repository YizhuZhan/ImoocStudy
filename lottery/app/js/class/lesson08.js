{
    // 简洁表示法
    let o = 2;
    let k = 3;
    let es5 = {
        o:o,
        k:k
    }
    let es6 = {
        o,
        k
    }
    console.log(es5,es6);

    let es5_method = {
        hello:function () {
            console.log('hello');
        }
    }
    let es6_method = {
        hello(){
            console.log('hello');
        }
    }
    es5_method.hello();
    es6_method.hello();
    // console.log(es5_method.hello(),es6_method.hello());
}

{
    //属性表达式
    let a = 'b';
    let es5_obj = {
        a:'c',
        b:'c'
    }
    let es6_obj = {
        [a]:'c'
    }
    console.log(es5_obj,es6_obj);//{a: "c", b: "c"},{b: "c"}
}

{
    //新增API: 1. Object.is() 功能与===相同；2.Object.assign()浅拷贝；3.Object.entries()
    console.log(Object.is('a','a'),'a'==='a');//true true
    console.log(Object.is([],[]),[]===[]);//false false，引用不同
    console.log(Object.assign({a:1},{b:2}));//{a: 1, b: 2}，浅拷贝，即引用类型拷贝引用地址；只拷贝自身对象的属性，不拷贝继承的属性；也不拷贝不可枚举的属性
    console.log(Object.assign({y:1},{x:{a:3},y:2}).x.a);//3

    let test = {k:123,o:456};
    for(let [key, value] of Object.entries(test)){
        console.log([key,value]);
    }

    //Object.values()是ES2017的一个提案，babel对它的支持不是很好，用value的时候使用entries就可以了
}

{
    //扩展运算符，babel对它的支持也不是很友好，使用时可能用不到
    // 扩展运算符
    // let {a,b,...c}={a:'test',b:'kill',c:'ddd',d:'ccc'};
    // c={
    //   c:'ddd',
    //   d:'ccc'
    // }
}

{
    //关于浅拷贝和深拷贝看过来
    /**
     * JavaScript 中永远是按值传递（pass-by-value），只不过当我们传递的是某个对象的引用时，这里的值指的是对象的引用。
     * 按值传递中函数的形参是被调用时所传实参的副本。修改形参的值并不会影响实参。
     * 而按引用传递（pass-by-reference）时，函数的形参接收实参的隐式引用，而不再是副本。
     * 这意味着函数形参的值如果被修改，实参也会被修改。同时两者指向相同的值。
     */
    function changeStuff(a, b, c) {
        a = a * 10;
        b.item = "changed";
        c = {item: "changed"};
    }
    let num = 10;
    let obj1 = {item: "unchanged"};
    let obj2 = {item: "unchanged"};
    changeStuff(num, obj1, obj2);
    console.log(num);//10
    console.log(obj1.item);//changed
    console.log(obj2.item);//unchanged


    //JavaScript 中是支持变量的连续赋值,例如 let a = b = 1; 但是在连续赋值中，会发生引用保留
    let a = {n:1};
    let b = a; // 持有a，以回查
    console.log(b);//{n:1}
    a.x = a = {n:2};
    console.log(a.x);//undefined
    console.log(a);//{n: 2}
    console.log(b);//{n: 1, x: {n: 2}}
}

