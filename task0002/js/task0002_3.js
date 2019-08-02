// 0---[0]
// 1---[-600]
// 2---[-1200]
// 3---[-1800]
// 4---[-2400]
// 5---[-3000]

var time;
var t;
var i = 0;    //记录数值，到达30时停止定时器

// 右翻页
function nextPlay() {
    var wrap = $('.scenery-wrap');
    if (parseInt(wrap.style.left) == -3000) {
        goPlay(5);
    } else {
        goPlay(-1);
    }
}

// 左翻页
function prevPlay() {
    var wrap = $('.scenery-wrap');
    if (parseInt(wrap.style.left) == 0) {
        goPlay(-5);
    } else {
        goPlay(1);
    }
}

// 点击圆点
function skipPlay() {
    var index = event.target.getAttribute('index');    // 获得点击哪个圆点
    var left = parseInt($('.scenery-wrap').style.left);
    var num = left / (-600);    // 0-5之间数值，代表6张图的位置
    var diff = index - num;    //要点的圆点与当前图片的间隔
    switch (diff) {
        case 5:
            goPlay(-5);
            break;
        case 4:
            goPlay(-4);
            break;
        case 3:
            goPlay(-3);
            break;
        case 2:
            goPlay(-2);
            break;
        case 1:
            goPlay(-1);
            break;
        case -1:
            goPlay(1);
            break;
        case -2:
            goPlay(2);
            break;
        case -3:
            goPlay(3);
            break;
        case -4:
            goPlay(4);
            break;
        case -5:
            goPlay(5);
            break;
    }
}

function orderPlay() {
    clearTimeout(t);
    var wrap = $('.scenery-wrap');
    if (parseInt(wrap.style.left) == 0) {
        goPlay(-5);
    } else {
        goPlay(1);
    }
    t = setTimeout(orderPlay, 1000);
}

function rorderPlay() {
    clearTimeout(t);
    var wrap = $('.scenery-wrap');
    if (parseInt(wrap.style.left) == -3000) {
        goPlay(5);
    } else {
        goPlay(-1);
    }
    t = setTimeout(rorderPlay, 1000);
}

function stopPlay() {
    clearTimeout(t);
}

//每次都位移30次  n:单词位移倍数    每次：0.01秒
function goPlay(n) {
    if (i == 0) {    // 定时器停止在执行
        var wrap = $('.scenery-wrap');
        var len = 20 * n;    // 单次位移的距离
        var list = $('.pot-list');
        var li = list.getElementsByTagName('li');

        // 清除圆点点亮状态
        for (var j = 0; j < li.length; j++) {
            li[j].id = '';
        }
        // 在位移完成前点亮圆点
        switch(parseInt(wrap.style.left) + len * 30) {
            case 0:
                li[0].id = 'seles';
                break;
            case -600:
                li[1].id = 'seles';
                break;
            case -1200:
                li[2].id = 'seles';
                break;
            case -1800:
                li[3].id = 'seles';
                break;
            case -2400:
                li[4].id = 'seles';
                break;
            case -3000:
                li[5].id = 'seles';
                break;
        }

        time = setInterval(function() {    //开始位移
            wrap.style.left = (parseInt(wrap.style.left) + len) + 'px';
            i++;
            // 完成位移取消事件
            if (i == 30) {
                clearInterval(time);
                i = 0;
            }
        }, 10);
    }
}