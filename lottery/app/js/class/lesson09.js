{
    //Symbol("foo") 不会强制字符串 "foo" 进入一个Symbol，它每次都创建一个新的Symbol：
    console.log(Symbol("foo") === Symbol("foo"));//false
    //永远都不可能相等，使用场景
    let a1 = Symbol();
    let a2 = Symbol();
    console.log(a1===a2);//false
    /**
     * 也可以通过另外的调用方法来生成可以与外界共享的Symbol类型，就是Symbol.for方法。
     * Symbol.for(key) 方法会根据给定的键 key，来从 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，
     * 否则，新建一个与该键关联的 symbol，并放入 symbol 注册表中。
     */
    Symbol.for("foo"); // 创建一个 symbol 并放入 symbol 注册表中，键为 "foo",生成key为 foo 的值独一无二的变量
    Symbol.for("foo"); // 从 symbol 注册表中读取键为"foo"的 symbol,先看key是否在全局注册过，有就取那个值，没有再生成一个独一无二的变量
    console.log(Symbol.for("bar") === Symbol.for("bar")); // true，证明了上面说的

    console.log(Symbol("bar") === Symbol("bar")); // false，Symbol() 函数每次都会返回新的一个 symbol
    var sym = Symbol.for("mario");
    console.log(sym.toString());//Symbol(mario)
    console.log(Symbol("mario"));//Symbol(mario)
    // "Symbol(mario)"，mario 既是该 symbol 在 symbol 注册表中的键名，又是该 symbol 自身的描述字符串

}

{
    let a1 = Symbol('abc');
    let obj = {
        [a1]:123,
        'abc': 345,
        'c':456
    };
    console.log(obj);//{abc: 345, c: 456, Symbol(abc): 123}
    //用Symbol做key值时，for in和for let of遍历都拿不到属性值
    for(let [key,value] of Object.entries(obj)){
        console.log([key,value]);//["abc", 345], ["c", 456]
    }
    //Object.getOwnPropertySymbols()方法得到数组，具有forEach方法，但此法上面互斥，只能拿到Symbol为key值的属性
    Object.getOwnPropertySymbols(obj).forEach(function (item) {
        console.log(item,obj[item]);//Symbol(abc) 123
    })
    //能够综合以上的两全其美方法: Reflect.ownKeys()，得到一个数组，具有forEach方法，可以拿到非Symbol与Symbol key值的方法
    Reflect.ownKeys(obj).forEach(function (item) {
        console.log(item,obj[item]);
    })
}