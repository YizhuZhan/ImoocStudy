(function () {
    var datepicker = window.datepicker;
    var resultData;
    //渲染函数，给定参数指定构建哪一年那个月的UI
    datepicker.buildUI = function (year,month) {
        //改成放在外层，用于其它方法访问
        resultData = datepicker.getMonthData(year,month);
        var days = resultData.days;
        //将之前写好的html变成合法的js字符串
        var html = '<div class = "ui-datapicker-header">'
            + '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>'
            + '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>'
            + '<span class="ui-datepicker-curr-month">'+resultData.year+'-'+resultData.month+'</span>'
            + '</div>'
            + '<div class="ui-datepicker-bocy">'
            + '<table>'
            + '<thead>'
            + '<tr>'
            + '<th>日</th>'
            + '<th>一</th>'
            + '<th>二</th>'
            + '<th>三</th>'
            + '<th>四</th>'
            + '<th>五</th>'
            + '<th>六</th>'
            + '</tr>'
            + '</thead>'
            + '<tbody>';
        for(let i = 0; i < days.length; i++){
            var date = days[i];
            //如果是一周的开始，则有开始标签<tr>
            if(i % 7 == 0){
                html += '<tr>';
            }
            html += '<td data-date =" '+days[i].date+'">' + date.showDate + '</td>';
            if(i % 7 == 6){
                html += '</tr>';
            }
        }
        html += '</tbody>'
            + '</table>'
            + '</div>';
        return html;
    };
    // <div class = 'ui-datepicker-wrapper'>
    var $wrapper = document.createElement('div');
    datepicker.render = function (direction) {
        var month,year;
        if(resultData){
            month = resultData.month;
            year = resultData.year;
        }
        if(direction == 'prev'){
            month++;
        }else if(direction == 'next'){
            month = resultData.month + 1;
            year = resultData.year;
        }
        var html = datepicker.buildUI(year,month);
        if($wrapper){
            $wrapper.classList.add('ui-datepicker-wrapper');
            $wrapper.innerHTML = html;
        }
        document.body.appendChild($wrapper);
    }


    //不直接将其挂在html上，而是另外用一个方法，传入一个DOM元素，方便用时灵活添加
    datepicker.init = function (input) {
        datepicker.render();
        // var $input = document.querySelector(input);
        var isOpen = false;
        input.addEventListener('click',function () {
            console.log('click');
            if(isOpen){
                $wrapper.classList.remove('ui-datepicker-wrapper-show');
                isOpen = false;
            }else{
                $wrapper.classList.add('ui-datepicker-wrapper-show');
                //为了使datepicker主体不占据文档流，要做成绝对定位，然后根据input的位置进行定位
                var left = input.offsetLeft;
                var top = input.offsetTop;
                var height = input.offsetHeight;
                $wrapper.style.top = top + height + 2 + 'px';
                $wrapper.style.left = left +'px';
                isOpen = true;
            }
        },false);

        $wrapper.addEventListener('click',function (e) {
            var el = e.target;
            if (!el.classList.contains('ui-datepicker-btn')) {
                return;
            }
            if(el.classList.contains('ui-datepicker-prev-btn')){
                datepicker.render('prev');

            }
            else if(el.classList.contains('ui-datepicker-next-btn')) {
                datepicker.render('next');

            }
        },false)

        $wrapper.addEventListener('click',function (e) {
            var el = e.target;
            if(el.tagName.toLowerCase() !== 'td'){return; }

            //考虑到遗留的上个月份的日期问题，不能单纯的取出td中的内容（showDate），而应该取真实的date
            //以data-开头的属性可以通过el.dataset取到，例如data-date属性通过el.dataset.date
            var date = new Date(resultData.year,resultData.month-1,el.dataset.date);
            input.value = format(date);
            $wrapper.classList.remove('ui-datepicker-wrapper-show');
            isOpen = false;

            //如果可以，选完日期关闭后，可以尝试让再次点开时回到当前月份===========================待完成


        },false)
    };

    function format (date) {
        var ret = '';
        function padding(num) {
            if(num <= 9){
                return '0'+num;
            }
            return num;
        }
        ret += date.getFullYear()+'-';
        ret += padding(date.getMonth()+1);
        ret += '-'+padding(date.getDate());
        return ret;
    }
})()