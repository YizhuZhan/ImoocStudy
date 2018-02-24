/**
 * Created by Administrator on 2017/10/17.
 */
window.onload = function(){
    var boxes = document.getElementsByClassName('box');
    //把是事件代理到每个分享的div容器box
    for(var i = 0;i < boxes.length; i++){
        boxes[i].onclick = function(e){
            //使兼容IE浏览器
            e = e || window.event;
            //从传入的事件中获取绑定元素
            var ele = e.srcElement;
            switch (ele.className){
                //点击X按钮，删除该box分享
                case 'close':
                    removeNode(ele.parentNode.parentNode);break;
                //点赞或取消赞
                case 'praise':
                    /**
                     * //对于DOM元素，children是指DOM Object类型的子对象，
                     * 不包括tag之间隐形存在的TextNode，
                     * 而childNodes包括tag之间隐形存在的TextNode对象。
                     */
                    //出错原因：DOM中还包括文本节点，因此并不是索引为2
                    //praisebox(ele.parentNode.parentNode.childNodes[2],ele);
                    praisebox(ele.parentNode.parentNode.parentNode,ele);
                    break;
                case 'btn':
                    reply(ele.parentNode.parentNode,ele.parentNode);
                    break;
                case 'comment-praise'://赞回复，自己的回复和别人的回复都可以点赞
                    praiseReply(ele);
                    break;
                case 'comment-operate'://操作评论，自己的评论可以删除，或者别人的评论可以回复
                    operate(ele);
                    break;
            }
        }
        /*******************************************************************/
        //tips:尽量不要再开一个循环，浪费时间
        var textarea = boxes[i].getElementsByClassName("comment")[0];
        textarea.onfocus = function(){
            //为什么必须用this？
            //textarea.parentNode.className = "text-box text-box-on";
            this.parentNode.className = "text-box text-box-on";
            this.value = (this.value == '评论…') ? '': this.value;
            this.onkeyup();
        }

        textarea.onblur = function(){
            //textarea.parentNode.className = 'text-box';
            var that = this;//添加了setTimeout,其绑定对象是window
            var val = this.value;//如果后面多次用到，直接用val标记效率高
            if(val == ''){
                setTimeout(function(){
                    that.value = '评论…'
                    that.parentNode.className = 'text-box';
                },400);
                document.get
            }
        }

        textarea.onkeyup = function(){
            var btn = this.parentNode.children[1];
            var word = this.parentNode.children[2];
            var wordnum = word.getElementsByClassName("length")[0];
            var len = this.value.length;
            wordnum.innerHTML = len;
            if(len != 0){
                btn.className = "btn";
            }else{
                btn.className = "btn btn-off";
            }
        }


    }
    /*************************************************************/
    //删除节点,switch .. case 'close'时调用
    function removeNode(node){
        node.parentNode.removeChild(node);
    }
    /************************************************************/
    //点赞或取消赞,switch .. case 'praise'时调用
    function praisebox(box,ele){
        var content = ele.innerHTML;
        //注意返回的是数组
        praises_total = box.getElementsByClassName("praises-total")[0];
        //alert(praises_total);
        //alert(praises_total.innerHTML);
        var total = parseInt(praises_total.getAttribute('total'));
        //alert(total);
        //alert(content);
        if(content == "赞"){
            var new_total = total + 1;
            praises_total.innerHTML = (new_total == 1) ? '我觉得很赞':"我和"+total+"个人觉得很赞";
            //alert(praises_total.innerHTML);
            //praises_total.style.display = 'block';
            ele.innerHTML = '取消赞';
            //出错原因：total++只是局部变量，而不是属性，再次点击后会
            //total++;
            praises_total.setAttribute('total',new_total);
        }else{
            var new_total = total - 1;
            praises_total.innerHTML = (new_total == 0) ? '':new_total+"个人觉得很赞";
            ele.innerHTML = '赞';
            praises_total.setAttribute('total',new_total);
        }

        praises_total.style.display = (new_total == 0) ? 'none' : 'block';
    }

    function reply(content,textbox){
        //alert("reply");
        var comment_list = content.getElementsByClassName("comment-list")[0];
        var textarea = textbox.getElementsByClassName("comment")[0];
        //alert(comment.value);

        //注意要用textareaElement.value，而不是textareaElement.innerHTML，这样才会根据keyup实时获取
        var html =
            '<img class="myhead" src="my.jpg" alt=""/>'+
            '<div class="comment-content">'+
            '<p class="comment-text"><span class="user">我：</span>'+textarea.value+'</p>'+
            '<p class="comment-time">'+formatDate()+
            '<a href="javascript:;" class="comment-praise" total="0" my="0" style="">赞</a>'+
            '<a href="javascript:;" class="comment-operate">删除</a>'+
            '</p>'+
            '</div>';
            var div = document.createElement("div");
            div.className="comment-box clearfix";
            div.setAttribute("user","self");
            div.innerHTML = html;

            /**
             * js中parentNode.append()和parentNode.appendChild()的区别：
             * parentNode.append()是还在试用期的方法，有兼容问题。
             * 是在parendNode节点中最后一个子节点后插入新Node或者DOMString（字符串，插入后为Text节点）.
             * parentNode.append()可以同时传入多个节点或字符串，没有返回值；
             * 而parentNode.appendChild()只能传一个节点，
             * 且不直接支持传字符串(需要parentNode.appendChild(document.createTextElement('字符串'))代替)，
             * 返回追加的Node节点
             */
            comment_list.appendChild(div);
            textarea.value = '';
            textarea.onblur();
    }
    function formatDate(){
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var mi = date.getMinutes();
        var s = date.getSeconds();
        m = m < 10 ? '0'+m : m;
        d = d < 10 ? '0'+d : d;
        h = h < 10 ? '0'+h : h;
        mi = mi < 10 ? '0'+mi : mi;
        s = s < 10 ? '0'+s : s;
        //alert(y+'-'+m+'-'+d+' '+h+':'+mi+'-'+s);
        return y+'-'+m+'-'+d+' '+h+':'+mi+'-'+s;
    }
    /***************************************************************************/
    //赞评论
    function praiseReply(ele){
        var my = parseInt(ele.getAttribute('my'));
        my = (my == 0 ? 1 : 0);
        ele.setAttribute('my',my);
        var total = parseInt(ele.getAttribute('total'));
        //alert("total:"+total);
        //alert("my:"+my);
        if(my == 0){
            total--;
            ele.innerHTML = ((total == 0) ? '': total) + '赞';
        }else{
            total++;
            ele.innerHTML = total + '取消赞';
        }
        ele.setAttribute('total',total);
        ele.style.display = (total == 0) ? '' : 'inline-block';
    }
    /********************************************************************************/
    //操作评论：删除自己的评论，或者回复别人的评论
    function operate(ele){
        if(ele.innerHTML == '回复'){
            //回复别人的评论
            var box = ele.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            var textarea = box.getElementsByTagName('textarea')[0];
            var user = ele.parentNode.parentNode.getElementsByClassName('user')[0].innerHTML;
            textarea.onfocus();//为啥直接用外面定义的textarea不对？？？？？？？？？？
            textarea.value = '回复'+user;
            textarea.onblur();
        }else{
            //删除自己的评论
           removeNode(ele.parentNode.parentNode.parentNode);
        }
    }
}
