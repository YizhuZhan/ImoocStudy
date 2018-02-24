{
    //创建Set: 1.
    let list = new Set();
    list.add(1);
    list.add(2);
    list.add(3);
    list.add(3);
    console.log(list);//Set(3) {1, 2, 3}
    console.log(list.size);//3
}

{
    //创建Set: 2.
    let arr = [1,2,3,4,2,'2'];
    let list = new Set(arr);
    console.log(list);//Set(5) {1, 2, 3, 4, "2"}
    console.log(list.size);//5
}

{
    //has , delete , clear , add
    let arr = ['a','b','c','d','e'];
    let list = new Set(arr);
    console.log(list);//Set(5) {"a", "b", "c", "d", "e"}
    console.log(list.delete('b'),list);//true ,Set(4) {"a", "c", "d", "e"}
    console.log(list.add('b'),list);//Set(5) {"a", "c", "d", "e", "b"}, Set(5) {"a", "c", "d", "e", "b"}
    console.log(list.has('a'));//true
    console.log(list.clear(),list);//undefined, Set(0) {}
}

{
    //遍历：1. keys();2.values()或者let of 直接遍历list,均得value; 3.entries()得key,value; 4.forEach(function...)得value
    let arr=['add','delete','clear','has'];
    let list=new Set(arr);
    for(let key of list.keys()){
        console.log(key);
    }
    for(let value of list.values()){//或者let value of list
        console.log(value);
    }
    for(let value of list){//或者let value of list,values()
        console.log(value);
    }
    for(let [key,value] of list.entries()){//或者let value of list
        console.log([key,value]);//["add", "add"],["delete", "delete"], ["clear", "clear"], ["has", "has"]
    }
    list.forEach(function (item) {
        console.log(item);
    });
}

{
    //WeakSet:
    let weaklist = new WeakSet();
    let org = {};
    weaklist.add(org);
    console.log(weaklist);
    // list.add(2);//1. WeakSet只能添加对象，不能添加基本类型和String
    //2.WeakSet是弱引用，只拷贝地址，而不是整个值，不检测该地址是否被垃圾回收掉了
    //3.无size属性，无clear方法（add,delete,has方法同Set），不能遍历
}

{
    //创建Map: 1.
    let map = new Map();
    let arr = ['123'];
    map.set(arr,456);
    console.log(map,map.get(arr));
}

{
    //创建Map: 2.
    let map = new Map([['a',1],['b',2]]);//接收一个数组参数，数组中的每一个元素都是一个二元数组，第一个元素是key，第二个元素时value
    //map的set, delete, clear, has 方法：
    console.log(map,map.size);//Map(2) {"a" => 1, "b" => 2} , 2
    console.log(map.delete('a'),map);//true , Map(1) {"b" => 2}
    console.log(map.has('b'));//true
    console.log(map.clear(),map);//undefined , Map(0) {}
    //Map的遍历与Set同：keys(), values(), entries(),forEach(function...)
}

{
    //weakmap:
    let weakmap = new WeakMap();
    let o = {};
    weakmap.set(o,1);
    console.log(weakmap,weakmap.get(o));//需要引babel.polyfill
    // weakmap.set('x',2);//1. WeakMap只能添加对象类型的key，不能添加基本类型和String
    //2.无size属性，无clear方法（add,delete,has方法同Set）；
    // 3.不能遍历
}

{
    //map 和 Array的对比：增删改查
    let map = new Map();
    let arr = [];
    //增
    map.set('a',1);//map
    map.set('b',2);
    arr.push({'a':1});//1
    arr.push({'b':2});
    console.log(map,arr);//均为 0:{a:1}
    //查
    let map_exist = map.has('a');//true
    let arr_exist = arr.find(item=>item.a);//{a:1}  notice !!!!!!!!!
    console.log(map_exist,arr_exist);
    //改
    map.set('b',33);
    arr.forEach(item => item.b ? item.b = 33 : '');// notice !!!!!!!!!!!
    console.log(map,arr);
    console.log(arr.find(item=>item.b));
    //删
    map.delete('b');
    let index = arr.findIndex(item=>item.b);//1  notice !!!!!!!!!!
    arr.splice(index,1);//  notice !!!!!!!!!!!!!!
    console.log(map,arr);
}

{
    //set 和 Array 的对比：
    let set = new Set();
    let arr = [];
    //增
    set.add({t:1}).add({k:2});
    arr.push({'t':1});
    arr.push({'k':2});
    console.log(set,arr);
    //查
    let set_exist = set.has({t:1});//存的是引用类型，因此肯定是false,只为了说明set的查询用has方法，如要查询，可按下述方式保存引用地址，然后去查询是否has这个引用地址
    let arr_exist = arr.find(item => item.t);
    console.log(set_exist,arr_exist);
    let add_temp = {x:3};
    set.add(add_temp);
    console.log(set.has(add_temp));//true
    arr.push({x:3});
    //改
    set.forEach(item => item.t ? item.t = 222 : '');
    arr.forEach(item => item.t ? item.t=222 : '');
    console.log(set,arr);
    console.log(arr.find(item => item.t));
    console.log(arr.find(item => item.x));
    console.log(arr.find(item => item.k));
    //删, set 和 Array 的删除都比较麻烦，set通过forEach找到地址，数组通过findIndex找到索引值
    set.delete(add_temp);//按照引用删除，可以删掉
    let index = arr.findIndex(item => item.x);
    arr.splice(index,1);
    console.log(set, arr);
    set.delete({t:222});//引用是不同的，这样删不掉，如果没保存引用还想删除set,则要按照如下方法
    let index1 = arr.find(item => item.x);
    arr.splice(index1,1);
    console.log(set,arr);
    set.forEach(item => item.t ? set.delete(item) : '');//  notice !!!!!!!!!
    console.log(set,arr);
}

{
    //Map,Set 与 Object 的对比
    let obj = {}
    let set = new Set();
    let map = new Map();
    //增
    obj.x = 1;
    set.add({x:1});
    map.set('x',1);
    console.info(obj,set,map);
    // //查
    let obj_exist = obj.hasOwnProperty('x');//true
    let obj_exist2 = 'x' in obj;
    let set_exist = set.forEach(item => item.x ? true :'' );//set没有find函数，这样找不到，要存对象地址let temp = {x:1}然后按照temp地址查找,undefined
    let map_exist = map.has('x');//true
    console.info(obj_exist,obj_exist2,set_exist,map_exist);
    // //改
    obj.x = 2;
    set.forEach(item => item.x ? item.x = 2 :'');//或者存let temp = {x:1}的地址，然后直接改temp.x = 2
    map.set('x',2);
    console.info(obj,set,map);
    // // 删
    delete obj.x;
    set.forEach(item => item.x ? set.delete(item) : '');
    map.delete('x');
    console.info(obj,set,map);
}