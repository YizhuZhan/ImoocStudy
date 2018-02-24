/**
 * 当输出方在具体的输出前用export时，引入方的写法：
 * 1.
 * import {A, test, Hello} from "./class/lesson17";
 * console.log(A,test,Hello );
 * 2.
 * import * as lesson17 from './class/lesson17';
 * console.log(lesson17.A,lesson17.test,lesson17.Hello );
 *
 * 当输出方在具体输出项前不加export，而统一采用export default方式，可以把命名权交给引入方：
 *
 */

//方法一：
// export let A = 123;
//
// export let test = () => {
//     console.log('test');
// }
//
// export class Hello {
//     test() {
//         console.log('class');
//     }
// }


//方法二：
let A = 123;

let test = () => {
    console.log('test');
}

class Hello {
    test() {
        console.log('class');
    }
}

export default {
    A,
    test,
    Hello
}