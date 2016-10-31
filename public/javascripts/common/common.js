/**
 * Created by CAN on 2016/10/23.
 */

const NEWS_TYPE = {0:'全部', 1:'精选', 2:'百家', 3:'本地', 4:'娱乐', 5:'社会'};


var comTool = {};

comTool.html_encode = function (str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
};

comTool.html_decode = function (str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
};


/********************************js时间工具*****************************************/
DateUtil = {};

DateUtil.isLeapYear = function(date){
    return (0==date.getYear()%4&&((date.getYear()%100!=0)||(date.getYear()%400==0)));
};


/**
 * 格式化日期
 */
DateUtil.fomatDate = function(date,fmt){
    var yyyy = date.getFullYear();
    var MM = date.getMonth();
    var dd = date.getDate();
    var HH = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    var hh = HH>12?HH-12:HH;
    var dateStr = fmt.replace('yyyy',yyyy).replace('MM',DateUtil.addZero(MM+1))
        .replace('dd',DateUtil.addZero(dd)).replace('HH',DateUtil.addZero(HH)).replace('mm',DateUtil.addZero(mm))
        .replace('ss',DateUtil.addZero(ss)).replace('hh',DateUtil.addZero(hh));
    return dateStr;
};

DateUtil.addZero = function(num){
    if(num<10)
        return '0'+num;
    return num;
};

/**
 * 将日期字符串转成日期
 * fmt：yyyy-MM-dd HH:mm:ss 或 yyyy-MM-dd
 */
DateUtil.parseDate = function(str,fmt){
    if(!str){
        return null;
    }
    var date;
    var year=0;
    var month=0;
    var day=0;
    var hour=0;
    var minute=0;
    var second=0;
    var tempStrs = str.split(' ');
    if(tempStrs[0]){
        var dateStrs = tempStrs[0].split("-");
        year = parseInt(dateStrs[0], 10);
        month = parseInt(dateStrs[1], 10) - 1;
        day = parseInt(dateStrs[2], 10);
    }
    if(tempStrs[1]){
        var timeStrs = tempStrs[1].split(":");
        hour = parseInt(timeStrs [0], 10);
        minute = parseInt(timeStrs[1], 10);
        second = parseInt(timeStrs[2], 10);
    }

    if(fmt=='yyyy-MM-dd'){
        date = new Date(year, month, day);
        return date;
    }
    else if(fmt=='yyyy-MM-dd HH:mm:ss'){
        date = new Date(year, month, day, hour, minute, second);
        return date;
    }
    return null;
};
/**
 * 获取指定日期最后一天日期
 */
DateUtil.getLastDate = function(date){
    date = arguments[0] || new Date();
    var newDate = new Date(date.getTime());
    newDate.setMonth(newDate.getMonth() + 1);
    newDate.setDate(1);
    var time = newDate.getTime() - 24 * 60 * 60 * 1000;
    newDate = new Date(time);
    return newDate;
};
/**
 * 获取指定日期第一天日期
 */
DateUtil.getFirstDate = function(date){
    date = arguments[0] || new Date();
    var newDate = new Date(date.getTime());
    newDate.setDate(1);
    return newDate;
};
/**
 * 日期计算
 * @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
 * @param num int
 * @param date Date 日期对象
 * @return Date 返回日期对象
 */
DateUtil.dateAdd = function(strInterval, num, date){
    date =  arguments[2] || new Date();
    switch (strInterval) {
        case 's' :return new Date(date.getTime() + (1000 * num));
        case 'n' :return new Date(date.getTime() + (60000 * num));
        case 'h' :return new Date(date.getTime() + (3600000 * num));
        case 'd' :return new Date(date.getTime() + (86400000 * num));
        case 'w' :return new Date(date.getTime() + ((86400000 * 7) * num));
        case 'm' :return new Date(date.getFullYear(), (date.getMonth()) + num, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
        case 'y' :return new Date((date.getFullYear() + num), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    }
};


