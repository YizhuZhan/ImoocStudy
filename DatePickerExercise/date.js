(function () {
    var datepicker = {};

    //获取一个月的数据
    datepicker.getMonthData = function (year, month) {
        var ret = [];
        if(!year || !month){
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }
        //获取当月第一天，日历从周一开始，如果当月第一天是周一，则开始为第一天，如果为周二，则要补上上月的一天
        var firstDay = new Date(year, month - 1, 1);
        var firstDayWeekDay = firstDay.getDay();
        if(firstDayWeekDay === 0){
            firstDayWeekDay = 7;
        }
        //为了避免year和month传入越界的情况，忘记怎么回事测试一下就知道了，可以输入月份是12,13,0，等情况来看
        //如下处理后，哪怕传入的月份参数越界，也会根据实际实例出的Date对象显示为正常年月，没有关系
        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        var lastDayOfLastMonth = new Date(year, month-1, 0);
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

        //在日历第一行需要显示多少个上个月的日期，如果是周一则不需要显示，如果是周二则要显示1个，周日则要显示6个
        var preMonthDayCount = firstDayWeekDay;
        // if (firstDayWeekDay === 7) firstDayWeekDay = 0;//解决了例如2018年4月的问题
        //当月的最后一天
        var lastDay = new Date(year,month,0);
        var lastDate = lastDay.getDate();

        //获取当月的每一天,统一获取6周
        for(let i = 0; i < 7 * 6; i++){
            var date = i - firstDayWeekDay + 1;
            var showDate;
            var thisMonth;
            if(date <= 0){
                showDate = lastDateOfLastMonth + date;
                thisMonth = month - 1;
            }
            else if(date > lastDate){
                showDate = date - lastDate;
                thisMonth = month + 1;
            }
            else {
                showDate = date;
                thisMonth = month;
            }
            //防止days中的月份越界
            if(thisMonth == 13) thisMonth = 1;
            if(thisMonth == 0) thisMonth = 12;

            ret.push({
                date:date,
                month:thisMonth,
                showDate:showDate
            });
        }

        return {
            year:year,
            month:month,
            days:ret
        };
    }


    window.datepicker = datepicker;

})()