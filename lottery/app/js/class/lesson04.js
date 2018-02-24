{
    console.log('a','\u0061');//a,a
    console.log('\u20BB7');//方块7
    console.log('\u{20BB7}');//𠮷
}

{
    let s = '𠮷a';
    console.log(s.length);//3
    //一下charAt取出来是乱码，但是charCodeAt取出来可以取到
    console.log("下面进行charAt测试 ：");
    console.log(s.charAt(0));//取第1 个位置字符，乱码
    console.log(s.charAt(1));//取第2 个位置字符，乱码
    console.log(s.charAt(2));//取第3 个位置字符，a
    console.log("下面进行charCodeAt测试 ：");
    console.log(s.charCodeAt(0));//取第1 个位置Unicode的编码码值，55362
    console.log(s.charCodeAt(1));//取第2 个位置Unicode的编码码值，57271
    console.log(s.charCodeAt(2));//取第3 个位置Unicode的编码码值，97

    let s1='𠮷a';
    console.log('length',s1.length);//3
    console.log("下面进行codePointAt测试 ：");
    console.log(s1.codePointAt(0));//134071，十进制
    console.log(s1.codePointAt(0).toString(16));//20bb7，16进制，取了整个‘𠮷’的两个字节
    console.log(s1.codePointAt(1));//57271，也就是'𠮷'的后一个字节
    console.log(s1.codePointAt(2));//97,也就是a
}

{
    //区别在于能否处理大于0xFFFF的Unicode字符
    console.log("下面进行 fromCharCode 和 fromCodePoint 测试 ：");
    console.log(String.fromCharCode(0x20bb7));//乱码
    console.log(String.fromCodePoint(0x20bb7));//𠮷
    console.log(String.fromCodePoint(134071));//𠮷

    console.log(String.fromCharCode(57271));//也就是'𠮷'的后一个字节,乱码
    console.log(String.fromCharCode(57271));//也就是'𠮷'的后一个字节,乱码
    console.log(String.fromCharCode(97));//也就是a,输出a

}

{
    let str = '\u{20bb7}abc';
    for(let i = 0;i < str.length;i++){
        console.log('es5',str[i]);//乱码 乱码 a b c
    }
    //let of 迭代器，常用
    for(let code of str){
        console.log('es6',code);//𠮷 a b c
    }
}

{
    //判断包含、起始、截止，使用率较高
    let str = 'string';
    console.log(str.includes('r'));//true
    console.log(str.includes('c'));//false

    console.log(str.startsWith('str'));//true
    console.log(str.endsWith('ng'));//true
}

{
    //字符串复制，重复，常用
    let str = 'abc';
    console.log(str.repeat(2));
}

{
    //模板字符串，把数据和模板拼成一个结果字符串，在前端很有意义的重要操作
    let name = 'Ivana';
    let info = 'hello world';
    let m = `I am ${name}, ${info}!`;
    console.log(m);
}

{
    //第一个参数指定要求的长度，第二个参数指定不够补什么，在格式化日期、彩票号码等地方十分有用
    console.log('1'.padStart(2,'0'));
    console.log('2'.padEnd(2,'0'));
}

{
    /**
     *  标签模板，有两个作用：
     *  1.在过滤html字符串用，防止XSS攻击时有用；
     *  2.处理多语言转换，比如有中文英文德语，用一套模板，用不同的return可以返回不同的结果
     */
    let user = {
        name:'list',
        info:'hello world'
    };
    test`I am ${user.name} ${user.info}`//(3) ["I am ", " ", "", raw: Array(3)]，第一个s参数是数组，包含一个raw属性
    test1`I am ${user.name} haha ${user.info}`//(3) ["I am ", " haha ", "", raw: Array(3)] "list"
    test2`I am ${user.name} haha ${user.info} lala`//(3) ["I am ", " haha ", " lala", raw: Array(3)] "list" "hello world"
    console.log(test2`I am ${user.name} ${user.info}`);//先输出(3) ["I am ", " ", "", raw: Array(3)] "list" "hello world"
                                                        // 再输出 I am , ,listhello world
    // 因为单单输出s，会输出数组形式，但与字符串进行加运算，则会转换为字符串格式，中间的空字符会变成逗号‘，’，
    // 为避免这种情况，可以用循环遍历数组s中的元素进行字符串拼接
    console.log(test3`I am ${user.name} ${user.info}`);//I am list hello world

    function test(s) {
        console.log(s);
        return s ;
    }
    function test1(s,v1) {
        console.log(s,v1);
        return s + v1;

    }
    function test2(s,v1,v2) {
        console.log(s,v1,v2);
        // return s +'';//单单输出s，会输出数组形式，但与字符串进行加运算，则会转换为字符串格式，中间的空字符会变成逗号‘，’
        return s + v1 + v2;
    }

    //重要，复习！！！！！！！！！！！！！！！！！！
    function test3(s,v1,v2) {
        let result = ''
        for(let i = 0;i < s.length; i++){
            result += s[i];
            if(i < arguments.length-1){
                result += arguments[i+1];
            }
        }
        // return result + v1 + v2;
        return result;
    }
}


{
    //重要，复习！！！！！！！！！！！！！！！！！！
    let { log } = console;
    let total = 30;

    let msg = passthru`The total is ${total}${total}${total} (${total*1.05} with tax)`;
    let msg1 = passthru1`The total is ${total}${total}${total} (${total*1.05} with tax)`;
    // console.log('passthru: ',msg);//The total is 303030 (31.5 with tax)
    // console.log(`The total is ${total}${total}${total} (${total*1.05} with tax)`);//The total is 303030 (31.5 with tax)
    console.log('passthru1 : ',msg1);//The total is 303030 (31.5 with tax)


    function passthru(literals) {
        let result = '';
        let i = 0;
        // log(literals);   // (5) ["The total is ", "", "", " (", " with tax)", raw: Array(5)]
        // console.log(arguments);//Arguments(5) [Array(5), 30, 30, 30, 31.5, callee: (...), Symbol(Symbol.iterator): ƒ]
        while (i < literals.length) {
            // console.log('result : ',result,'; i : ',i);
            result += literals[i++];
            if (i < arguments.length) {
                result += arguments[i];
            }
        }
        return result;
    }


    //上述过程采用rest参数，写法如下
    function passthru1(literals,...values) {
        console.log('literals : ',literals);//literals :  (5) ["The total is ", "", "", " (", " with tax)", raw: Array(5)]
        console.log('values : ',values);//values :  (4) [30, 30, 30, 31.5]
        var output = "";
        for (var index = 0; index < values.length; index++) {
            output += literals[index] + values[index];
        }
        output += literals[index];//字符串模板比表达式少一个，加上
        return output;
    }
}

{
    //“标签模板”的一个重要应用，就是过滤HTML字符串，防止用户输入恶意内容。通过过滤可以将字符串转码:
    function SaferHTML(templateData) {
        let s = templateData[0];
        for (let i = 1; i < arguments.length; i++) {
            let arg = String(arguments[i]);

            // 在替换中转义特殊字符
            s += arg.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");

            // 不转义模板中的字符
            s += templateData[i];
        }
        return s;
    }

    var sender = '<script>alert("abc");</script>'; // 恶意代码
    var sender1 = '<script>alert("abc");&</script>'; // 恶意代码
    var message = SaferHTML`<p>${sender} has sent you a message.</p>`;
    var message1 = SaferHTML`<p>${sender1} has sent you a message.</p>`;

    console.log(message);   //  <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
    console.log(message1);
    //  <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
    // console.log(`<p>${sender} has sent you a message.</p>`)   //<p><script>alert("abc")</script> has sent you a message.</p>
}

{
    //弹出localhost:3000 says:1
    //不懂
    // (+[])[([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!+[]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!+[]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]][([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!+[]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!+[]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]+(!![]+[])[+[]]+([][([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!+[]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!+[]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[[+!+[]]+[!+[]+!+[]+!+[]+!+[]]]+[+!+[]]+([][([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!+[]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!+[]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!+[]+[])[+[]]+(!+[]+[])[!+[]+!+[]+!+[]]+(!+[]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]])()
}

{
    //使用频率不高，用时记得有raw即可
    console.log(`Hi\n${1+2}`);//Hi 换行 3
    console.log(String.raw`Hi\n${1+2}`);//Hi\n 3，没有换行，因为该api对所有斜杠进行了转义，变成双\\



    tag`First line\nSecond line`
    function tag(strings) {
        console.log(strings.raw[0]);
        // strings.raw[0] 为 "First line\\nSecond line"
        // 打印输出 "First line\nSecond line"
    }
    //这里会将\n 转义，为了方便取得转义前的原始模板而设计的。


}