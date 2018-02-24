{
    let a,b,rest;
    [a,b] = [1,2];
    console.log(a,b);
}

{
    let a,b,rest;
    [a,b,,...rest] = [1,2,3,4,5,6];//数组解构赋值,1,2,[4,5,6]
    console.log(a,b,rest);
}

{
    let a,b;
    ({a,b} = {a:1,b:2})//对象解构赋值
    console.log(a,b)
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
    [a,,...b] = f();
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



