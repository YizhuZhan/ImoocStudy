/**
 * Created by Administrator on 2017/12/4.
 */
window.onload = function(){
    showTime();
}

function showTime(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var date = now.getDate();
    var d = now.getDay();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    var week = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
    //alert(d);
    d = week[d];
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("show").innerHTML = year+"年"+month+"月"+date+"日 "+d+" "+h+":"+m+":"+s;
    t = setTimeout(showTime,1000);
}
//var t;
function checkTime(num){
    num = +num;
    //alert(num+""+typeof num);
    if(num<10){
        num = '0'+num;
    }
    return num;
}
