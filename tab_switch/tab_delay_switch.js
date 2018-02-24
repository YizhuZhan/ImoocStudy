//由于是js实现，因此$符号需要做定义
function $(id){
//            console.log("func id ok");
    return typeof(id) === 'string'?document.getElementById(id):id;
}
window.onload = function () {
//            console.log("window onload ok");
    var lis = $("notice-tit").getElementsByTagName("li");
    var divs = $("notice-con").getElementsByTagName("div");

    var time = null;//用于存放定时器
    if(lis.length != divs.length) return;
//            alert(lis.length);
    for(var i = 0; i < lis.length; i++){
//                console.log("i is"+i);
        lis[i].id = i;
//                lis[i].onclick = function(){
        lis[i].onmouseover = function(){
            var that=this;
//                    index = i;
//                    console.log("mouseover "+i);


            if(time){
                clearTimeout(time);
                time = null;
            }
            time = setTimeout(function(){
//                        alert(i)
                /**
                 * for循环放在外面会先变白，然后定时时间到后才切换li样式，
                 * 而放在里面则同步切换，因此放在定时器里面
                 */
                for(var j = 0; j < lis.length; j++){
                    lis[j].className = "";
                    divs[j].style.display = "none";
                }
                lis[that.id].className = "select";
                divs[that.id].style.display = "block";
            },500);

        }
    }
}