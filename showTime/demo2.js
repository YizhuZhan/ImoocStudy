/**
 * Created by Administrator on 2017/12/4.
 */
window.onload = function(){
    showTime();
}
function showTime(){
    var now = new Date();
    var targetTime = new Date("12,9,2017");
    var t = targetTime.getTime()-now.getTime();
    var d = Math.ceil(t/(1000*60*60*24));

    if(d>0){
        document.getElementById("showtime").innerHTML = d;
    }
}