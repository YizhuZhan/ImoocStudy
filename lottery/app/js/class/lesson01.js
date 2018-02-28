function  test() {
    for(let i = 1;i<3;i++){
        console.log(i);
    }
console.log(i);
let a = 1;
// let a = 2;
}

// test();

function last() {
    const PI = 3.1415926;
    // PI = 3;
    const k = {
        a:1
    };
    k.b = 2;
    k.c = 3;//对象引用不变
    k.a = 2;
    console.log(PI,k);//3.1415926   {a: 2, b: 2, c: 3}
}

last();

const PI = 3.14;
console.log(PI);//3.14, 说明const有块级作用域，且只在其作用域内有效

{
    const arr = [1,2,3];
    arr[1] = 3;//可以，因为引用不变
    // arr = [2,3,4];//会报语法错误，因为[2,3,4]开辟了另一块存储空间
    console.log(arr);//[1,3,3]
}

{
    /**
     * 如果我们希望将某个对象同样变成不可变类型（Read Only）则需要使用 Object.freeze()；
     * 不过该方法仅对于键值对的 Object 起作用（就是字面量形式的），而无法作用于 Date、Map 与 Set 等类型：
     */

    // Example 1
    const me = Object.freeze({name: "Jacopo"});
    // me.age = 28;//Uncaught TypeError: Cannot add property age, object is not extensible
    // console.log(me.age); //undefined
    // //Example 2
    const arr = Object.freeze([-1, 1, 2, 3]);
    // arr[0] = 0;//Uncaught TypeError: Cannot assign to read only property '0' of object '[object Array]'
    console.log(arr[0]); //-1
    /**
     * 但是只读的Object.freeze() 也只能防止顶层属性被修改，而无法限制对于嵌套属性的修改，
     * 需要结合Lesson 8 的浅拷贝与深拷贝部分继续学习。
     */
    //Example 3
    const animal = Object.freeze({
        name: 'Jacopo',
        pet: {
            type: 'dog',
            name: 'Spock'
        }
    });
    animal.pet.name = 'Rocky';
    animal.pet.breed = 'German Shepherd';
    console.log(animal.pet.name); //Rocky
    console.log(animal.pet.breed); //German Shepherd
}