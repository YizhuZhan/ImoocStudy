{
    //举例 1 ：限定某个属性只读的修饰器
    let readonly = (target, name, descriptor) => {//descriptor是一个函数，用于修改类的行为，target也就是这个类
        console.log(`target ${target}`);//target [object Object]
        console.log(`name ${name}`);// name time
        console.log(`descriptor ${descriptor}`);// descriptor [object Object]
        descriptor.writable = false;
        return descriptor;
    }


    class Test{
        @readonly//decorator在类内或者类前使用
        time(){
            return '2018-2-2';
        }
    }

    let test = new Test()
    // console.log(test.time());
    // test.time = function () {
    //     console.log('2017-03-11');
    // }
    console.log(test.time());// Uncaught TypeError: Cannot assign to read only property 'time' of object '
}

{
    let typename = function (target, name, descriptor) {
        target.myname = 'hello';
    }

    @typename
    class Test{

    }
    console.log(Test.myname);

    // 第三方库修饰器的js库：core-decorators; npm install core-decorators
}

{
    //原生 js 复习
    var person={name:'Leo',age:18}
    var descriptor=Object.getOwnPropertyDescriptor(person,'name');
    console.log(descriptor.value);
    console.log(descriptor.writable);
    console.log(descriptor);
}

{//???????????????????????????????????????????????????????????????????
    let log = (type) => {
        return (target, name, descriptor) => {
            let src_method = descriptor.value;
            descriptor.value = function (...arg) {//arg 是什么 ？？？？？？？？？？？？？？？
                console.log('arg',arg);
                console.log(`log ${type}`);
                src_method.apply(target, arg);
            }
        }
    }
    class Ad{
        @log('show')
        show(){
            console.log('show ad');
        }
        @log('click')
        click(){
            console.log('click ad');
        }
    }
    let ad = new Ad();
    ad.show();
    ad.click();
}