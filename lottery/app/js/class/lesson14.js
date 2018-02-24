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
        console.log(key);
    }
}


//
// {
//     let arr = ['hello','world'];
//     for(let value of arr){
//         console.log('value',value);
//     }
// }