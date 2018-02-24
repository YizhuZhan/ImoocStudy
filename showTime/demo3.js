/**
 * Created by Administrator on 2017/12/4.
 */
window.onload = function(){
    showLeftTime();
}
function showLeftTime(){
    var now = new Date();
    //var target = new Date("2017/12/01,23:59:59");
    var target = new Date("2017/12/12,23:59:59");
    var leftTime = target.getTime() - now.getTime();
    var d = parseInt(leftTime/(1000*60*60*24));
    var h = parseInt((leftTime/(1000*60*60))%24);
    var m = parseInt((leftTime/(1000*60))%60);
    var s = parseInt((leftTime/1000)%60);
    //alert(leftTime);
    if(leftTime<=0){
        //document.getElementsByClassName("time").innerHTML = "团购已结束";//不对？？？？？
        document.getElementById("leftTime").innerHTML = "团购已结束";
        clearInterval(sh);
    }
    document.getElementById("leftTime").innerHTML = d+"天"+h+"小时"+m+"分"+s+"秒";
    //sh = setTimeout(showLeftTime,1000);
}
var sh = setInterval(showLeftTime,1000);