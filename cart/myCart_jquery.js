/**
 * Created by Administrator on 2017/12/11.
 */
$(document).ready(function(){
   //var tr = $("tbody tr").first();
   //console.log(tr);
   // getSubTotal(tr);

    

})

function getSubTotal(tr){
    var num = tr.find("input:text").attr("value");
    var singlePrice =tr.find("td:eq(2)").html();
    num = parseInt(num);
    singlePrice = parseFloat(singlePrice);
    var subPriceTotal = (num * singlePrice).toFixed("2");
    var subPriceEl = tr.find("td:eq(4)").html(subPriceTotal);
    console.log(subPriceTotal);
}

function bindNumOperation(){

}

