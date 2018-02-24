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
    console.log(Object.assign({y:1},{x:{a:3},y:2}).x.a);//3,可以深拷贝了吗？？？？？？？？？

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

