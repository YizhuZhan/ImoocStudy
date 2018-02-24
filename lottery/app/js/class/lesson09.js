{
    //永远都不可能相等，使用场景
    let a1 = Symbol();
    let a2 = Symbol();
    console.log(a1===a2);//false
    let a3 = Symbol.for('a3');//生成key为 a3 的值独一无二的变量
    let a4 = Symbol.for('a3');//先看key是否在全局注册过，有就取那个值，没有再生成一个独一无二的变量
    console.log(a3===a4);//true
}

{
    let a1 = Symbol('abc');
    let obj = {
        [a1]:123,
        'abc': 345,
        'c':456
    };
    console.log(obj);//{abc: 345, c: 456, Symbol(abc): 123}
    //用Symbol做key值时，for in和let of遍历都拿不到属性值
    for(let [key,value] of Object.entries(obj)){
        console.log([key,value]);//["abc", 345], ["c", 456]
    }
    //Object.getOwnPropertySymbols()方法得到数组，具有forEach方法，但此法上面互斥，只能拿到Symbol为key值的属性
    Object.getOwnPropertySymbols(obj).forEach(function (item) {
        console.log(item,obj[item]);
    })
    //能够综合以上的两全其美方法: Reflect.ownKeys()，得到一个数组，具有forEach方法，可以拿到非Symbol与Symbol key值的方法
    Reflect.ownKeys(obj).forEach(function (item) {
        console.log(item,obj[item]);
    })
}