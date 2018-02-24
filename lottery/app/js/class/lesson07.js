{
    //参数默认值，注意：默认值参数的后面不能再有不赋默认值的参数，  notice !!!!!!
    function test(x,y = 'hello') {
        console.log(x,y);
    }
    test('Ivana');//Ivana hello
    test('Ivana','sql');//Ivana sql
}

{
    //作用域问题
    let x = 'aaa';
    function test1(x, y = x) {
        console.log(x,y);
    }
    test1('bbb');//控制台输出bbb bbb
    test1();//控制台输出undefined undefined

    function test2(c, y = x) {
        console.log(c,x,y);
    }
    test2();//undefined "aaa" "aaa"
    test2('bbb');//bbb aaa aaa
}

{
    //不确定参数个数时，将接收的参数都转为数组，与ES5的arguments有异曲同工之妙，但auguments[0]与此不同，表示
    //...args之后不能再有其它参数了，否则会混乱不清
    function test3(...args) {
        for(let rest of args){
            console.log(rest);
        }
    }
    test3(1,2,3,4,'a');
}

{
    //把数组拆成离散的值
    console.log(...[1,2,4]);
    console.log('a',...[1,2,4]);
}

{
    //箭头函数：三部分组成（函数名，函数参数，函数返回值），做箭头函数时注意this绑定，有时适合用箭头函数，有时不适合用
    let arrow = v => v*5;
    console.log(arrow(3));
    let arrow2 = () => 5;
    console.log(arrow2());
}

{
    // //自行补充：箭头函数的this绑定问题，第一轮
    let obj={
        fn:function(){
            console.log(this);
        }
    }
    obj.fn();//obj

    let obj1= {
        fn: function () {
            setTimeout(function () {
                console.log(this);
            });
        }
    }
    obj1.fn();//window

    let obj2={
        fn:function(){
            setTimeout(() => {
                console.log(this);
            });
        }
    }
    obj2.fn();//obj2

    let obj3={
        num:3,
        fn:function(){
            setTimeout(function(){
                console.log(this.num);
            });
        }
    }
    obj3.fn();//undefined

    var obj4={
        num:4,
        fn:function(){
            setTimeout(() => {
                console.log(this.num);
            });
        }
    }
    obj4.fn();//4

    //自行补充：箭头函数的this绑定问题，第二轮嵌套函数
    let obj5={
        num:4,
        fn:function(){
            let f=() => {
                console.log(this);//obj5
                setTimeout(() => {
                    console.log(this);//obj5
                });
            }
            f();
        }
    }
    obj5.fn();

    // obj6的例子看到undefined undefined  ???????????????????????????
    let obj6={
        num:4,
        fn:function(){
            let f=function(){
                console.log(this); //window,因为函数f定义后并没有对象调用，this直接绑定到最外层的window对象,
                setTimeout(() => {
                    console.log(this);//window，外层this绑定到了window,内层也相当于定义在window层（全局环境）
                });
            }
            f();
        }
    }
    obj6.fn();

    let obj7={
        num:4,
        fn:function(){
            let f=() => {
                console.log(this); //obj7,f()定义在obj7对象中，this就指向obj7,这就是箭头函数this指向的关键
                setTimeout(function() {
                    console.log(this);//window，非箭头函数的情况下还是要看宿主对象是谁，如果没有被对象调用，函数体中的this就绑定的window上
                });
            }
            f();
        }
    }
    obj7.fn();
}

{
    //伪调用，函数的最后一句是个函数的情况叫做伪调用；
    //伪调用的好处是：提升性能，比递归等节省资源，什么时候用伪调用，如果有嵌套调用，为了提升性能，建议写成伪调用的形式。
    function tail(x) {
        console.log('tail',x);
    }
    function fx(x) {
        return tail(x);
    }
    fx(123);
}