/**
 * Created by Administrator on 2017/12/5.
 */
window.onload = function () {
    //低版本IE的兼容问题
    if(!document.getElementsByClassName1){
        document.getElementsByClassName1 = function (cls) {
            var ret = [];
            var els = document.getElementsByTagName("*");
            if(els){
                for(var i = 0; i < els.length;i++){
                    var str = els[i].className.split(" ");
                    var tempCls = str.some(function (x) {
                        return x === cls;
                    });
                    if(tempCls){
                        ret.push(els[i]);
                    }
                }
            }
            return ret;
        }
    }
    var table = document.getElementById("cartTable");
    var foot = document.getElementById("foot");
    var trs = table.children[1].rows;
    var checkInputs = document.getElementsByClassName1("check");
    var checkones = document.getElementsByClassName1("check-one");
    var checkalls = document.getElementsByClassName1("check-all");
    var selectedTotalNum = document.getElementById("selectedTotalNum");
    var selectedTotalPrice = document.getElementById("selectedTotalPrice");
    var selectedViewList = document.getElementById("selectedViewList");
    //var up = foot.getElementsByClassName1("arrow-up")[0];
    var up = document.getElementsByClassName1("arrow-up")[0];
    //var down = foot.getElementsByClassName1("arrow-down")[0];
    var down = document.getElementsByClassName1("arrow-down")[0];
    //var deleteSelected = foot.getElementsByClassName1("delete-selected")[0];
    var deleteSelected = document.getElementsByClassName1("delete-selected")[0];
    //这个也和下面的可以合在一起，参见imooc demo
    for(var z = 0; z<checkones.length; z++){
        //!function(z){
        checkones[z].onchange = function () {
            //console.log(z);//4,闭包,如果用括号传入z并调用，z会一次等于1,2,3,4；但这样会导致绑定的东西是一个调用的结果undefined，而不是一个函数体
            //console.log(z+"  "+checkones[z].checked);//z=4，数组越界报错
            //    if(!checkones[z].checked){//所以用this就好了
            if(!this.checked){//所以用this就好了
                for(var k = 0;k<checkalls.length;k++){
                    checkalls[k].checked = false;
                }
            }
            getTotal();
        }
        //}(z)
    }
    //这个也和上面的可以合在一起，参见imooc demo
    for(var j = 0; j < checkalls.length; j++){
        checkalls[j].onchange = function () {
            //alert("checkall"+j);
            for(var k = 0;k<checkInputs.length;k++){
                checkInputs[k].checked = this.checked;
            }
            getTotal();//由于checkall元素的onchange事件定义了两次，会覆盖前面的，因此这里仍然需要调用getTotal()
        }
    }
    //修改总勾选数量、总价格、悬浮层展示及取消选择
    function getTotal(){
        var selectedNum = 0;
        var totalPrice = 0;
        var HTMLstr = "";
        for(var i = 0; i< trs.length; i++){
            if(trs[i].getElementsByTagName("input")[0].checked){
                selectedNum += parseInt(trs[i].getElementsByTagName("input")[1].value);
                totalPrice += parseFloat(trs[i].cells[4].innerHTML);
                HTMLstr += '<div><img src = "'+trs[i].getElementsByTagName('img')[0].src+'"/><span class = "del" index = '+i+'>取消选择</span></div>';
            }
        }
        selectedTotalNum.innerHTML = selectedNum;
        //alert(selectNum);
        selectedTotalPrice.innerHTML = totalPrice.toFixed(2);
        //alert(totalPrice);
        selectedViewList.innerHTML = HTMLstr;
    }
    function getSubTotal(tr){
        var singlePrice = parseFloat(tr.cells[2].innerHTML);
        var num = parseInt(tr.getElementsByTagName("input")[1].value);
        tr.cells[4].innerHTML = parseFloat(singlePrice * num).toFixed(2);
    }

    //增加、减少商品数量，删除商品
    for(var i = 0; i < trs.length; i++){
        trs[i].onclick = function (e) {
            e = e || window.event;
            var el = e.srcElement;
            var cls = el.className;
            //var reduce = this.getElementsByClassName1("reduce")[0];//为了解决getElementsByClassName1在IE低版本无定义的问题
            var reduce = this.getElementsByTagName("span")[0];
            var subNumEl = this.getElementsByTagName("input")[1];
            var subNum = parseInt(subNumEl.value);
            //var singlePrice = parseFloat(this.cells[2].innerHTML);
            //var subPriceEl = this.cells[4];
            //var subPrice = 0;
            switch (cls){
                case "add":
                    subNum++;
                    subNumEl.value = subNum;
                    //subPrice = subNum * singlePrice;
                    //subPriceEl.innerHTML = subPrice.toFixed(2);
                    reduce.innerHTML = "-";
                    getSubTotal(this);
                    getTotal();
                    break;
                case "reduce":
                    if(subNum > 1){
                        subNum--;
                        subNumEl.value = subNum;
                        //subPrice = subNum * singlePrice;
                        //subPriceEl.innerHTML = subPrice.toFixed(2);
                    }
                    if(subNum == 1){
                        reduce.innerHTML = "&nbsp;";
                    }
                    getSubTotal(this);
                    getTotal();
                    break;
                case "delete":
                    confirm("确定删除吗？");
                    this.parentNode.removeChild(this);
                    getTotal();
                    break;
                default:
                    break;
            }
        }
    }
    up.onclick = function(){
        selectedViewList.style.display = "block";
        down.style.display = "inline-block";
        up.style.display = "none";
    }
    down.onclick = function () {
        selectedViewList.style.display = "none";
        down.style.display = "none";
        up.style.display = "inline-block";
    }

    deleteSelected.onclick = function () {
        if(0 == selectedTotalNum) return;
        if(confirm("确定删除吗？")){
            for(var i = 0; i < trs.length; i++){
                if(checkones[i].checked){
                    trs[i].parentNode.removeChild(trs[i]);
                    i--;
                }
            }
            getTotal();
        }
    }

    //var cancleSelected = selectedViewList.getElementsByClassName1("del");
    //for(var i = 0; i < cancleSelected.length;i++){
    //    cancleSelected[i].onclick = function () {
    //        this.parentNode.parentNode.removeChild('#item"'+i+'"');
    //    }
    //}
    selectedViewList.onclick = function (e) {
        e = e || window.event;
        var el = e.srcElement;
        if(el.className == "del"){
            var index = el.getAttribute("index");
            var todel = trs[index].getElementsByTagName("input")[0];
            //不需要想着如何隐藏div，只需要点掉checkbox就可以会隐藏了，换个思路
            todel.checked = false;
            todel.onchange();
        }
    }

    //绑定输入框keyup事件，实时更新小计价格
    for(var i = 0; i < trs.length; i++){
        trs[i].getElementsByTagName("input")[1].onkeyup = function(){
            var trEl = this.parentNode.parentNode;
            //var singlePrice = trEl.cells[2].innerHTML;
            //var subPriceEl = trEl.cells[4];
            var num = parseInt(this.value);
            //var reduceEl = trEl.getElementsByClassName1("reduce")[0];//为了解决getElementsByClassName1在IE低版本无定义的问题
            var reduceEl = trEl.getElementsByTagName("span")[0];
            if(isNaN(num) || num <1){
                this.value = 1;
                reduceEl.innerHTML = "&nbsp;";
            }else{
                reduceEl.innerHTML = "-";
            }
            //subPriceEl.innerHTML = parseFloat(singlePrice * num).toFixed(2);
            getSubTotal(trEl);
            getTotal();
        }
    }
}