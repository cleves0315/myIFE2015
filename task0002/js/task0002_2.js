var time;

function submission() {
    var exhibit = $('.exhibit');    //获得报错文本
    var dtext = $('.date-text');
    var text = dtext.value.split('-');
    
    //先做清除处理
    exhibit.innerHTML = '';
    clearInterval(time);
    if ($('.dateBox')) {    //删除显示时间差文本
        $('.main-wrap').removeChild($('.dateBox'));
    }
    
    if (text.length != 3) {
        exhibit.innerHTML = '请输入正确的日期格式：YYYY-MM-DD';
        $(".exhibit").style.color = '#d50000';
    } else {
        var udate = new Date(dtext.value);    //用户输入时间
        var tdate = new Date();    //实时时间
        var diffdate = udate - tdate;    //时间差(毫秒单位)

        if (diffdate <= 0) {
            exhibit.innerHTML = '请输入大于今天的日期';
            $(".exhibit").style.color = '#d50000';
        } else {
            var div = document.createElement("div");
            var h3 = document.createElement("h3");
            var p = document.createElement('p');
            div.appendChild(h3);
            div.appendChild(p);
            $('.main-wrap').appendChild(div);

            div.className = 'dateBox';
            h3.innerHTML = '倒计时：';
            p.innerHTML = diffTime(udate);    //显示时间差文本

            time = setInterval(function() {
                p.innerHTML = diffTime(udate);
            }, 1000);
        }
    }
    dtext.value = "";
}

function reset() {
    $('.date-text').innerHTML = '';
    $('.exhibit').innerHTML = '';
    clearInterval(time);
    if ($('.dateBox')) {
        $('.main-wrap').removeChild($('.dateBox'));
    }
}

function diffTime(date) {
    var tdate = new Date();     //创建实时时间
    var diffdate = date.getTime() - tdate.getTime();    //时间毫秒差
    var q_diffday = diffdate / (24 * 60 * 60 * 1000);   //转换天单位
    var diffday = Math.floor(q_diffday);    //天
    var q_diffhour = (q_diffday - diffday) * 24;    //剩下值转换小时单位
    var diffhour = Math.floor(q_diffhour);    //时
    var q_diffminute = (q_diffhour - diffhour) * 60;    //剩下值转分单位
    var diffminute = Math.floor(q_diffminute);    //分
    var q_diffsecond = (q_diffminute - diffminute) * 60;    //剩下值转秒单位
    var diffsecond = Math.floor(q_diffsecond);    //秒
    var s = "距离" + date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日还有" + diffday + "天" + diffhour + "小时" + diffminute + "分" + diffsecond + "秒";
    return s;
}

function GetDateTimeDiff(startTime, endTime) {
    var retValue = {};
    
    var date3 = endTime.getTime() - startTime.getTime();  //时间差的毫秒数
 
    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    retValue.Days = days;
 
    var years = Math.floor(days / 365);
    retValue.Years = years;
 
    var months = Math.floor(days / 30);
    retValue.Months = months;
 
    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    retValue.Hours = hours;
 
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    retValue.Minutes = minutes;
 
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    retValue.Seconds = seconds;
 
    var strTime = "";
    if (years >= 1) {
        strTime = years + "年前";
    } else if (months >= 1) {
        strTime = months + "个月前";
    } else if (days >= 1) {
        strTime = days + "天前";
    } else if (hours >= 1) {
        strTime = hours + "小时前";
    } else {
        strTime = minutes + "分钟前";
    }
    retValue.PubTime = strTime;     //帖子,文章,博客发表时间的一种简短表示方法
    return retValue;
}