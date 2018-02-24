function $(id){
	return typeof id==='string'?document.getElementById(id):id;
}

window.onload=tab;

function tab(){
  //当前高亮显示的页签索引
  var index=0;
  var timer=null;

  // 获取所有页签和要切换的内容
  var lis=$('notice-tit').getElementsByTagName('li');
  var divs=$('notice-con').getElementsByTagName('div');


  //for(var i=0;i<lis.length;i++){
  //  lis[i].id=i;
  //  lis[i].onmouseover=function(){
  //    clearInterval(timer);
  //    changeOption(this.id);
  //  }
  //  lis[i].onmouseout=function(){
  //    timer=setInterval(autoPlay,2000);
  //  }
  //}
    /**
     * 在添加定时器之前，先清空定时器，
     * 为了防止鼠标滑过太快，每次离开都开一个定时器，
     * 这样就开了很多的定时器，使页面卡顿。
     */
  if(timer){
    clearInterval(timer);
    timer=null;
  }
  // 添加定时器，改变当前高亮的索引
  timer=setInterval(autoPlay,2000);

  function autoPlay(){
      index++;
      if(index>=lis.length){
         index=0;
      }
      changeOption(index);
  }

  function changeOption(curIndex){
    for(var j=0;j<lis.length;j++){
       lis[j].className='';
       divs[j].style.display='none';
    }
    lis[curIndex].className='select';
    divs[curIndex].style.display='block';
    index=curIndex;
  }
}