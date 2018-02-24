{
    class Parent{
        constructor(name = 'Ivana'){
            this.name = name;
        }
    }
    let person = new Parent();
    console.log(parent.name);// Ivana
    person.name = 'v'
    console.log(parent.name);// v

    //继承
    class Child extends Parent{

    }
    let child = new Child();
    console.log(child.name);//Ivana
}

{
    //继承传递参数
    class Parent{
        constructor(name = 'Ivana'){
            this.name = name;
        }
    }
    //继承
    class Child extends Parent{
        constructor(name = 'sql'){
            super(name);
            this.type = 'child';
        }
        get longName(){
            return 'mk'+this.name;
        }
        set longName(value){
            this.name = value;
        }
    }
    let child1 = new Child();
    console.log(child1.name,child1.type);//sql child
    let child2 = new Child('hello');
    console.log(child2.name,child2.type);//hello child
}

{
    //继承传递参数
    class Parent{
        constructor(name = 'Ivana'){
            this.name = name;
        }
        get longName(){
            return 'mk'+this.name;
        }
        set longName(value){
            this.name = value;
        }
    }

    let parent = new Parent();
    console.log(parent.longName);//mkIvana
    parent.longName = 'hello'
    console.log(parent.longName);//mkIvana
}

{
    //类的静态方法，用static关键词描述；静态属性只是一个提案，还没有实现，可以通过直接在类上定义实现：Parent.attrName = ...
    class Parent{
        constructor(name = 'Ivana'){
            this.name = name;
        }
        static tell(){//静态方法
            console.log('tell');
        }
    }
    Parent.tell();
    Parent.type = 'haha';//静态属性
    console.log(Parent.type);
}
