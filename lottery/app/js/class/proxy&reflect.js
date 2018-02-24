{
    //base
    let target = {
        name:'Ivana',
        age:26
    };

    const handler = {
        get:function (target,key,proxy) {
            const today = new Date();
            console.log(`GET request made for ${key} at ${today}`);
            return Reflect.get(target,key,proxy);
        }
    }
    let proxy = new Proxy(target,handler);
    console.log(proxy.name);
    console.log(proxy.age);
}

{
    //抽离校验模块 1. ：
    let numericalDataStore = {
        count: 0,
        amount: 1234,
        total: 14
    };
    numericalDataStore = new Proxy(numericalDataStore,{
        set:function (target,key,value,proxy) {
            if(typeof value != 'number'){
                throw Error('Properties in numericalDataStore can only be number');
            }
            return Reflect.set(target,key,value,proxy);
        }
    });
    numericalDataStore.count = 12;
    console.log(numericalDataStore.count,'ok');
    // numericalDataStore.amount = 'cal';//throw Error()
}

{
    //抽离校验模块  2.：
    //由于校验器和主业务逻辑分离，因此可以无限扩展校验器内容，而不会对相关的类或函数造成直接的破坏
    function createValidator(target,validator) {
        return new Proxy(target,{
            _validator:validator,
            set:function (target,key,value,proxy) {
                if(target.hasOwnProperty(key)){
                    let valid = this._validator[key];//不支持点，只能用中括号，否则会提示valid is not a function   ， notice !!!!!!!!!!
                    if(!!valid(value)){
                        return Reflect.set(target,key,value,proxy);
                    }else{
                        throw Error(`cannot set ${value} to ${key}. Invalid.`);
                    }
                }else{
                    throw Error(`${key} is not a valid property.`);
                }
            }
        })
    }

    const personalValidators = {
        name:function (val) {
            return typeof val ==='string';
        },
        age:function (val) {
            return typeof val === 'number' && val > 18;
        }
    }

    class Person {
        constructor(name, age){
            this.name = name;
            this.age = age;
            return createValidator(this,personalValidators);
        }
    }

    let person = new Person('Ivana',26);
    console.log(person.name,person.age);
    person.name = 'sql';
    person.age = 25;
    console.log(person.age,person.name);
    // person.name = 12;//throw Error:  cannot set 12 to name. Invalid.
    // person.age = 15;//throw Error : cannot set 15 to age. Invalid.
}

{
    //抽离校验模块  3.：利用Proxy做参数类型和数目检查

}