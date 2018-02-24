{
    let obj = {
        time:'2018-01-26',
        name:'net',
        _r:123
    };
    let monitor = new Proxy(obj,{
        // 拦截对象属性的读取
        get(target,key){
            if(key === 'time'){
                return target[key].replace('2018','2022');
            }else{
                return target[key];
            }
        },
        // 拦截对象设置属性
        set(target,key,value){
            if(key === 'name'){
                return target[key] = value;
            }else {
                return target[key];
            }
        },
        // 拦截delete
        deleteProperty(target,key){
            if(key.indexOf('_')> -1){
                delete target[key];//不能用点,点删不掉？？？
                return true;
            }else {
                return target[key];//用点会报错？？？？
            }
        },
        // 拦截key in object操作
        has(target, key){
            if(key === 'name'){
                return false;
            }else{
                return (key in target);
            }
        },
        // 拦截Object.keys,Object.getOwnPropertySymbols,Object.getOwnPropertyNames
        ownKeys(target){
            return Object.keys(target).filter(item => item != 'time');//过滤掉time属性，保护time属性
        }
    })

    console.log(monitor.name,monitor.time);//index.js:9618 net 2022-01-26

    monitor['time'] = 2016;//用.无效，要用[]，用.发现这些设置都是可以的，因为无法点一个字符串key
    monitor['name'] = 'Imooc';
    console.log(obj);//{time: "2018-01-26", name: "Imooc", _r: 123}

    console.log('name' in monitor, 'time' in monitor);//false true

    console.log(delete monitor['name']);//true ?????????1
    console.log(delete monitor['_r']);//true ???????????
    console.log(obj);//{time: "2018-01-26", name: "Imooc"}
    console.log(Object.keys(monitor));//["name"]
}

{
    //Proxy对象中有的方法，Reflect类中都有，并且名称用法都一样。改变Object...操作的习惯，改用Reflect...
    {
        let obj={
            time:'2017-03-11',
            name:'net',
            _r:123
        };

        console.log(Reflect.get(obj,'time'));//2017-03-11
        Reflect.set(obj,'name','mukewang');
        console.log(obj);//{time: "2017-03-11", name: "mukewang", _r: 123}
        console.log(Reflect.has(obj,'name'));//true
    }
}

//更详细的Proxy和Reflect应用场景参见 proxy&reflect.js