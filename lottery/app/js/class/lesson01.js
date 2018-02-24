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
    console.log(PI,k);
}

last();