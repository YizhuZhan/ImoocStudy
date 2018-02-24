class Chotee{
    constructor(){
        this.name = '我是浏览器热刷新脚本，我成功啦!'
    }
}

const ct1 = new Chotee()

document.body.innerHTML = ct1.name;