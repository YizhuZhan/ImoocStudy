{
    //新增的Array.of()方法

    let arr = Array.of(3,4,6,9,11);
    let arr1 = Array.of();
    console.log(arr,arr1);
}

{
    //新增方法Array.from:

    // 1.把一些伪数组，比如集合等，转化为真正的数组

    let p = document.querySelectorAll('p');//返回NodeList
    console.log(p);
    p.forEach(function (item) {
        console.log(item.textContent);//也可以呀~~~
    })
    let pArr = Array.from(p);//返回Array
    console.log(pArr);
    pArr.forEach(function (item) {//数组方法
        console.log(item.textContent);//js原生获取DOM文本内容方法
    })

    //2.Array.from也有类似于map的映射方法

    console.log(Array.from([1,3,5],function (item) {
        return item *2;
    }));
}

{
    //第一个参数表示替换成什么，第二三个参数（可选）表示替换的起始位置 1 开始，到位置 3 结束，不到3 也没关系，把到了的替换掉就可以了
    console.log([1,'a',undefined].fill(7));
    console.log(['a','b','c'].fill(7,1,3));
}

{
    for(let index of ['1','c','ks'].keys()){
        console.log(index);//0,1,2,返回的是数组下标，相当于0:'1',1:'c',2:'ks'
    }
    for(let value of ['1','c','ks'].values()){
        console.log(value);//values方法存在兼容性问题，如果不开兼容（无babel-polyfill），则会报错,'1','c','ks'
    }
    for(let [index,value] of ['1','c','ks'].entries()){
        console.log(index,value);
    }
}

{
    //第一个参数表示从哪个位置开始替换，第二个参数表示从哪个位置读取数据，第三个参数表示表示在哪个位置截止
    // (也就是取到了[4,5),也就是只有4,从位置0开始替换，也就是只替换了位置0)，用的不多
    console.log([1,2,3,4,5].copyWithin(0,3,4));//
}

{
    //重要
    console.log([1,2,3,4,5].find(function (item) {//找到第一个满足的即返回，notice !!!!!!
        return item > 2;//3
    }));
    console.log([1,2,3,4,5].findIndex(function (item) {//找到第一个满足的即返回，但返回的是符合条件元素的下标， notice !!!!!!
        return item > 4;//4
    }));
}

{
    console.log([1,2,NaN].includes(1));//是否包含这个值，相比于find不可以自定义，除此之外与find类似,true
    console.log([1,2,NaN].includes(NaN));//true，在ES5中，两个NaN是不相等的，但是在ES6中用includes判断可以找出是否有NaN
}