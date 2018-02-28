{
    let a,b,rest;
    [a,b] = [1,2];
    console.log(a,b);
}

{
    let x,y,rest;
    [x,y,,...rest] = [1,2,3,4,5,6];//数组解构赋值,1,2,[4,5,6]
    console.log(x,y,rest);

    // Fail-safe.
    let [, , , s, t] = [1, 2, 3];
    console.log(s, t);//undefined undefined

    // Advance deep arrays
    let [a, [b, [c, d]]] = [1, [2, [[[3, 4], 5], 6]]];
    console.log("a:", a, "b:", b, "c:", c, "d:", d);
    // => a: 1 b: 2 c: [ [ 3, 4 ], 5 ] d: 6
}

{
    // Oops: This doesn't work:
    //let a, b;
    // { a, b } = {a: 1, b: 2};

    let a,b;
    ({a,b} = {a:1,b:2});//对象解构赋值，这里要特别注意一下！！！！！！！！！！！！！！！！！！！！！！！！！！
    console.log(a,b);

    // This due to the grammar in JS.
    // Starting with { implies a block scope, not an object literal.
    // () converts to an expression.

    // From Harmony Wiki:
    // Note that object literals cannot appear in
    // statement positions, so a plain object
    // destructuring assignment statement
    //  { x } = y must be parenthesized either
    // as ({ x } = y) or ({ x }) = y.

    // Fail-safe
    let {user: s} = {user2: 5};
    console.log(s);//undefined

    // More values
    let {prop: x, prop2: y} = {prop: 5, prop2: 10};
    console.log(x, y);//5 10

    // Short-hand syntax
    let { prop, prop2} = {prop: 5, prop2: 10};
    console.log(prop, prop2);//5 10
}

{
    let a,b,c;
    [a,b,c] = [1,2]
    console.log(a,b,c)//如果解构赋值没有成功配对，则为undefined，因此需要有默认值
}

{
    let a,b,c;
    [a,b,c = 3] = [1,2]
    console.log(a,b,c)//带有默认值
}
/**
 * 使用场景：
 * 1.变量交换
 * 2.取函数返回值
 * 3.json对象解构赋值
 */

{
    let a = 1;
    let b = 2;
    [a,b] = [b,a];
    console.log(a,b);
}

{
    function f() {
        return [1,2];
    }
    let a,b;
    [a,b] = f();
    console.log(a,b)
}

{
    function f() {
        return [1,2,3,4,5];
    }
    let a,b;
    [a,,,b] = f();
    console.log(a,b);//1,4
}

{
    function f() {
        return [1,2,3,4,5];
    }
    let a,b;
    [a,,...b] = f();// Omit certain values，  and Combine with spread/rest operator (accumulates the rest of the values)
    console.log(a,b);//1,[3,4,5]
}

{
    let o = {p:42,q:true};
    let {p,q} = o;//对象解构赋值的左侧一定是对象的格式
    console.log(p,q);
}

{
    let {a = 4,b = 6} = {a:3};
    console.log(a,b)
}

{
    let metaData = {
        title:'abc',
        test:[{title:'test',
            desc:'description'
        }]
    }
    let {title:esTitle,test:[{title:cntitle}]} = metaData;//应用：json对象解构赋值
    console.log(esTitle,cntitle);
}

{
    // 对象解构与数组解构相结合
    let {prop: x, prop2: [, y]} = {prop: 5, prop2: [10, 100]};
    console.log(x, y);//5 100
}

{
    // Deep objects
    let {
        prop: x,
        prop2: {
            prop2: {
                nested: [, , b]
            }
        }
    } = {prop: "Hello", prop2: {prop2: {nested: ["a", "b", "c"]}}};
    console.log(x, b);//Hello c

    // === Combining all to make fun happen

    // All well and good, can we do more? Yes!
    // Using as method parameters
    let foo = function ({prop: x}) {
        console.log(x);
    };

    // foo({invalid: 1});//undefined
    foo({prop: 1});//1
}

{
    // Can also use with the advanced example
    let foo = function ({
                            prop: x,
                            prop2: {
                                prop2: {
                                    nested: b
                                }
                            }
                        }) {
        console.log(x, ...b);//Hello a b c
        console.log(x, b);//Hello (3) ["a", "b", "c"]
    };
    foo({prop: "Hello", prop2: {prop2: {nested: ["a", "b", "c"]}}});
}

{
    // In combination with other ES2015 features.

    // Computed property names
    const name = 'fieldName';
    const computedObject = {[name]: name}; // (where object is { 'fieldName': 'fieldName' })
    const {[name]: nameValue} = computedObject;
    console.log(nameValue);//fieldName

    // Rest and defaults
    let ajax = function ({url = "localhost", port: p = 80}, ...data) {
        console.log("Url:", url, "Port:", p, "Rest:", data);
    };
    ajax({url: "someHost"}, "additional", "data", "hello");//Url: someHost Port: 80 Rest: (3) ["additional", "data", "hello"]
    ajax({}, "additional", "data", "hello");//Url: localhost Port: 80 Rest: (3) ["additional", "data", "hello"]
}

{
    //试了一下，没有问题呀
    // Ooops: Doesn't work (in traceur),probably due to traceur compiler
    let ajax = ({url = "localhost", port: p = 80}, ...data) => {
        console.log("Url:", url, "Port:", p, "Rest:", data);
    };
    ajax({}, "additional", "data", "hello");//Url: localhost Port: 80 Rest: (3) ["additional", "data", "hello"]
    //
}

{
    // But this does:
    let ajax = ({url: url = "localhost", port: p = 80}, ...data) => {
        console.log("Url:", url, "Port:", p, "Rest:", data);
    };
    ajax({}, "additional", "data", "hello");//Url: localhost Port: 80 Rest: (3) ["additional", "data", "hello"]
}

{
    // Like _.pluck
    let users = [
        {user: "Name1"},
        {user: "Name2"},
        {user: "Name2"},
        {user: "Name3"}
    ];
    let names = users.map(({user}) => user);
    console.log(names);//[ 'Name1', 'Name2', 'Name2', 'Name3' ]
}

{
    //为解构对象提供一个默认值
    // Advanced usage with Array Comprehension and default values
    let users = [
        { user: "Name1" },
        { user: "Name2", age: 2 },
        { user: "Name2" },
        { user: "Name3", age: 4 }
    ];

    for(let { user, age = "DEFAULT AGE" } of users){
        console.log(user, age);
    }
    // Name1 DEFAULT AGE
    // Name2 2
    // Name2 DEFAULT AGE
    // Name3 4
}

{
    //需要import 'babel-polyfill',否则会报 Uncaught ReferenceError: regeneratorRuntime is not defined
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



