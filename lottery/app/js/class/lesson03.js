{
    // #构造函数#
    //ES5中的两种写法：
    let regex = new RegExp('xyz','i');//两个参数时，第一个参数必须是字符串不能是正则，第二个是修饰符
    let regex2 = new RegExp(/xyz/i);//第一个参数是正则表达式，不接受第二个参数，否则会报错
    console.log(regex.test('xyz123'),regex2.test('xyz123'));

    //ES6中新增写法：允许两个参数时，第一个参数是正则表达式，并且第二个参数的修饰符覆盖正则表达式中的修饰符
    let regex3 = new RegExp(/abc/ig,'i');//原有正则对象的修饰符是ig，它会被第二个参数 i 覆盖
    console.log(regex3.test('abc123'));
    console.log(regex3.flags);
}

{
    // y 修饰符
    let s = "bbbb_bbb_bb_b";
    let a1 = /b+/y;
    let a2 = /b+/g;
    console.log(a1.exec(s),a2.exec(s));// ["bbbb"],["bbbb"]
    console.log(a1.exec(s),a2.exec(s));// ["bbb"],null
    console.log(a1.sticky,a2.sticky);//表示是否开启了 y 的粘连模式
    /**
     *  g 和 y 修饰符都是全局匹配，
     *  g 是从上一次匹配的位置继续寻找，直到找到匹配的位置，不一定在第一个匹配上；
     *  但是 y 必须是匹配上的“下一个字符”（此处为下划线，不满足）,记：y 的匹配更严格一些
     */
}

{
    /**
     * ES6 对正则表达式添加了 u 修饰符，含义为 "Unicode模式"，用来正确处理大于 \uFFFF 的Unicode字符。也就是说，会正确处理四个字节的 UTF-16 编码。
     */
    // console.log('\uD83D\uDC2A');
    console.log("u修饰符,/^\\uD83D/.test('\\uD83D\\uDC2A') :",/^\uD83D/.test('\uD83D\uDC2A'));//true，会当做两个字符（4 字节），因此能匹配成功,true
    console.log("u修饰符,/^\\uD83D/u.test('\\uD83D\\uDC2A') : ",/^\uD83D/u.test('\uD83D\uDC2A'));//false,加了u 修饰符的当做一个字符，因此不匹配成功,false

    //不加 u 修饰符的{61} 会被当成字符 u 重复61次，加上 u 修饰符才当做Unicode字符'a'
    console.log("/\\u{61}/.test('a') : ",/\u{61}/.test('a'));//false
    console.log("/\\u{61}/u.test('a') : ",/\u{61}/u.test('a'));//true

    //
    console.log('\u{20BB7}');//𠮷

    var s = '𠮷';
    console.log(/\u{20BB7}/.test(s));//false
    console.log(/\u{20BB7}/u.test(s));//true

    // 点 "." 匹配大于 0xFFFF 的 Unicode 字符，需要 u 修饰符（点不再能匹配全部，只是2字节以下的，2 字节以上要加 u）
    console.log(/^.$/.test(s));//false
    console.log(/^.$/u.test(s));//true

    //正则表达式中的匹配字符有大于 2 字节的 Unicode 一定要加 u 修饰符
    console.log(/𠮷{2}/.test('𠮷𠮷'));//false
    console.log(/𠮷{2}/u.test('𠮷𠮷'));//true
    console.log('量词',/a{2}/.test('aa')); // true
    console.log('量词',/a{2}/u.test('aa')); // true
}

{
    // 字符串对象的4个使用正则表达式的方法： match(),replace(),search(),split()这四个方法全部调用RegExp的实例的方法。
    let regex = new RegExp('xyz', 'ig');
    console.log(regex.exec('xyz0XYZ1xyz2'));//["xyz", index: 0, input: "xyz0XYZ1xyz2"]
    // console.log(regex.exec('xyz0XYZ1xyz2'));//true,["XYZ", index: 4, input: "xyz0XYZ1xyz2"]
    console.log(regex.test('xyz0XYZ1xyz2'), regex.exec('xyz0XYZ1xyz2'));//true,["XYZ", index: 4, input: "xyz0XYZ1xyz2"]
}

{
    // #正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是行终止符（line terminator character）除外
    // U+000A 换行符（\n）
    // U+000D 回车符（\r）
    // U+2028 行分隔符（line separator）
    // U+2029 段分隔符（paragraph separator）
    // 只是一个提案目前还不支持
    // let reg=/test.go/s;
    // console.log(reg.test('test\ngo'));
    // console.log(reg.test('test\ngo'));
    console.log('s变通方法',/foo.bar/.test('foo\nbar'));//false
    console.log('s变通方法',/foo[^]bar/.test('foo\nbar'));//true
}