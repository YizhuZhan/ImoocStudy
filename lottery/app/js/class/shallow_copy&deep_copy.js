{
    // 浅拷贝实现
    function shadowCopy(target, source){
        if( !source || typeof source !== 'object'){
            return;
        }
        // 这个方法有点小trick，target一定得事先定义好，不然就不能改变实参了。
        // 具体原因解释可以看参考资料中 JS是值传递还是引用传递
        if( !target || typeof target !== 'object'){
            return;
        }
        // 这边最好区别一下对象和数组的复制
        for(let key in source){
            if(source.hasOwnProperty(key)){
                target[key] = source[key];
            }
        }
    }

    //测试例子
        let arr = [1,2,3];
        let arr2 = [];
        shadowCopy(arr2, arr);
        console.log(arr2);
    //[1,2,3]

        let today = {
            weather: 'Sunny',
            date: {
                week: 'Wed'
            }
        }

        let tomorrow = {};
        shadowCopy(tomorrow, today);
        console.log(tomorrow);
    // Object {weather: "Sunny", date: Object}
}


{
    /**
     * Object.assign() 方法可以把任意多个的源对象所拥有的自身可枚举属性拷贝给目标对象，然后返回目标对象。
     * Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象身上。
     * 注意，对于访问器属性，该方法会执行那个访问器属性的 getter 函数，然后把得到的值拷贝给目标对象，
     * 如果你想拷贝访问器属性本身，请使用 Object.getOwnPropertyDescriptor() 和Object.defineProperties() 方法。
     *
     * 注意，字符串类型和 symbol 类型的属性都会被拷贝。
     *
     * 注意，在属性拷贝过程中可能会产生异常，比如目标对象的某个只读属性和源对象的某个属性同名，
     * 这时该方法会抛出一个 TypeError 异常，拷贝过程中断，已经拷贝成功的属性不会受到影响，还未拷贝的属性将不会再被拷贝。
     *
     * 注意， Object.assign 会跳过那些值为 null 或 undefined 的源对象。
     *
     *Object.assign(target, ...sources)
     */
    //例子：浅拷贝一个对象
    let obj = { a: 1 };
    let copy = Object.assign({}, obj);
    console.log(copy); // { a: 1 }

    //例子：合并若干个对象
    let o1 = { a: 1 };
    let o2 = { b: 2 };
    let o3 = { c: 3 };

    let obj = Object.assign(o1, o2, o3);
    console.log(obj); // { a: 1, b: 2, c: 3 }
    console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。
}

{
    //例子：拷贝 symbol 类型的属性
    let o1 = { a: 1 };
    let o2 = { [Symbol("foo")]: 2 };

    let obj = Object.assign({}, o1, o2);
    console.log(obj); // { a: 1, [Symbol("foo")]: 2 }

    //更多见有道云笔记
}
