// {
//     //以数组为例，Array已经为我们实现好了Iterator接口
//     let arr=['hello','world'];
//     // console.log(Symbol.iterator);//Symbol(Symbol.iterator)
//     // console.log(arr[Symbol.iterator]);//ƒ values() { [native code] }
//     // console.log(arr[Symbol.iterator]());//Array Iterator {}
//     let map = arr[Symbol.iterator]();
//
//     console.log(map.next());//{value: "hello", done: false}
//     console.log(map.next());//{value: "world", done: false}
//     console.log(map.next());//{value: undefined, done: true}
//     console.log(map.next());//{value: undefined, done: true}
//
//     let str = "",num = 2;
//
//     console.log(str[Symbol.iterator]);//[Symbol.iterator]()
//     console.log(num[Symbol.iterator]);//undefined
// }


{
    //自定义Iterator接口，Object没有帮我们部署内置的Iterator接口，因为其中的数据是我们自己填充的
    let obj = {
        start:[1,3,2],
        end:[7,9,8],
        [Symbol.iterator](){
            let index = 0;
            let arr = this.start.concat(this.end);//要通过this访问，否则提示start / end is not defined
            // console.log(arr);//(6) [1, 3, 2, 7, 9, 8]
            let len = arr.length;
            return {
                next(){
                    if(index < len){
                        return {
                            value:arr[index++],
                            done:false
                        };
                    }else {
                        return{
                            value:arr[index++],
                            done:true
                        };
                    }
                }
            };
        }
    }

    for(let key of obj){
        console.log(key);//1 3 2 7 9 8
    }
}

{
    //Spread Operator 与 Iteration Protocols：
    // 实际上 Spread Operator 也是使用的 Iteration Protocols 来进行元素遍历与结果搜集；
    // 因此我们也可以通过自定义 Iterator 的方式来控制 Spread Operator 的表现。
    // Iterable 协议规定了对象必须包含 Symbol.iterator 方法，该方法返回某个 Iterator 对象：

//     interface Iterable {
//         [Symbol.iterator]() {
//             //...
//             return Iterator;
//         }
//     }
//
//
//     interface Iterable {
//     [Symbol.iterator]() {
//         //...
//         return Iterator;
//     }
// }

    /**
     * 该 Iterator 对象从属于 Iterator Protocol，其需要提供 next 成员方法，该方法会返回某个包含 done 与 value 属性的对象：
     */
    // interface Iterator {
    //     next() {
    //         //...
    //         return {
    //             value: <value>,
    //             done: <boolean>
    //     };
    //     };
    // }

    /**
     * 典型的 Iterable 对象就是字符串，例如：
     */
    let str = 'hi';
    let iterator = str[Symbol.iterator]();
    console.log(iterator.toString()); // '[object String Iterator]'
    console.log(iterator.next());     //{ value: 'h', done: false }
    console.log(iterator.next());     //{ value: 'i', done: false }
    console.log(iterator.next());     //{ value: undefined, done: true }
    console.log(([...str])); //(2) ['h', 'i']
}

{
    // 我们可以通过自定义 array-like 对象的 Symbol.iterator 属性来控制其在迭代器上的效果：
    function iterator() {
        var index = 0;
        return {
            next: () => ({ // Conform to Iterator protocol
                done: index >= this.length,
                value: this[index++]
            })
        };
    }

    var arrayLike = {
        0: 'Cat',
        1: 'Bird',
        length: 2
    };
    // Conform to Iterable Protocol
    arrayLike[Symbol.iterator] = iterator;
    var array = [...arrayLike];
    console.log(array); // ['Cat', 'Bird']
    /**
     * arrayLike[Symbol.iterator] 为该对象创建了值为某个迭代器的属性，从而使该对象符合了 Iterable 协议；
     * 而 iterator() 又返回了包含 next 成员方法的对象，使得该对象最终具有和数组相似的行为表现。
     */

}

{



}



// {
//     let arr = ['hello','world'];
//     for(let value of arr){
//         console.log('value',value);
//     }
// }