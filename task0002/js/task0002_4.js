// text ? onkeyup || text.value
// text.vaule==true   出现提示选项(可以按键上下选择，回车键确认选中)
// text.value==true   onfocus== false 提示选项消失，再次点击 提示框出现
// text.value==true -> false  提示选项消失，把之前的提示记录删除
// text.value==true   选中提示选项，提示选项消失，并返回对用提示到text.value
// !!!消失提示框时是否保存数据
// 文本框只有一个字母时才显示提示栏！！！
var time;
var r;      // 记录li状态
var data = {
    a: ['ajax', 'aaa', 'abc', 'acd'],
    b: ['blue', 'boe', 'boe', 'bbc'],
    c: ['ccb', 'cbe', 'cob', 'cde'],
    d: ['dw', 'doe', 'dom', 'dwe'],
    e: ['eee', 'efo', 'ect', 'ebc'],
    f: ['foee', 'fnale', 'fpt', 'foj'],
    g: ['gbe', 'gobe', 'gg', 'gle'],
    h: ['hoe', 'hob', 'holle', 'h'],
    i: ['ioi', 'ice', 'is', 'ith'],
    j: ['jen', 'jin', 'join', 'jpe'],
    k: ['kkk', 'koe', 'kebw', 'kp'],
    l: ['lcc', 'lpa', 'logo', 'lolo'],
    m: ['mot', 'mmoc', 'mpt', 'mmp'],
    n: ['nhtt', 'nbc', 'nba', 'nb'],
    o: ['ooo', 'o_o', 'o-o', 'oio'],
    p: ['p_p', 'ptp', 'plp', 'pop'],
    q: ['q_q', 'qbq', 'qpw', 'qqqq'],
    r: ['r_r', 'rom', 'rar', 'rrr'],
    s: ['s_s', 's_r', 'sos', 'sob'],
    t: ['tata', 'tttt', 't_t', 't-t'],
    u: ['u_u', 'uuu', 'u0u', 'ubc'],
    v: ['vwv', 'vov', 'vvv', 'v_v'],
    w: ['wow', 'w_w', 'waw', 'www'],
    x: ['xa', 'xox', 'xyz', 'x_x'],
    y: ['y_y', 'yob', 'yea', 'ybz'],
    z: ['zop', 'zise', 'zzz', 'z_z']
};

window.onload = function () {
    var seart =  $('.search-text');
    var s = /[a-z]/i;
    addEvent(seart, 'focus', seartFocus);
    addEvent(seart, 'keyup', seartKeyup);
    addEvent(seart, 'keydown', seartKeydown);
    addEvent(seart, 'blur', seartBlur);
    time = setInterval(function() {        // 监听文本框状态：仅有1位[a-z]字符时，显示提示数据
        if ((seart.value.length == 1) && s.test(seart.value)) {
            showData(seart.value.toLowerCase());
        }
    }, 400);
}

// 输入字时弹出提示选项，只限英文字母
function seartFocus() {
    var seart =  $('.search-text');
    var list = $('.search-list');
    // if (seart.value) {
    //     list.style.display = 'block';
    // }
}

// 文本框失焦
function seartBlur() {
    var list = $('.search-list');
    list.style.display = 'none';
}

// 键盘放开
function seartKeyup() {
    var event = event || window.event || arguments.callee.caller.arguments[0];
    var s = /[a-z]/i;
    var list = $('.search-list');
    var seart =  $('.search-text');
    // 当文本框恢复1位字母时重新显示提示框
    if ((seart.value.length == 1) && s.test(seart.value)) {  
        list.style.display = 'block';
    }
}

// 键盘按下出现提示栏
function seartKeydown() {
    var event = event || window.event || arguments.callee.caller.arguments[0];
    var seart =  $('.search-text');
    var list = $('.search-list');
    var li = list.getElementsByTagName('li');
    // console.log(event.keyCode);
    
    // 键盘选择提示栏
    if (event.keyCode == 38 && (list.style.display == 'block')) {
        if (r == 0) {
            li[r].style.backgroundColor = '#fff';
            r = 3;
        } else if (!r) {
            r = 3;
        } else {
            li[r].style.backgroundColor = '#fff';    
            r--;
        }
        li[r].style.backgroundColor = '#e9e9e9';
    }
    if (event.keyCode == 40 && (list.style.display == 'block')) {
        if (r == 3) {
            li[r].style.backgroundColor = '#fff';
            r = 0;
        } else if (!r && (r != 0)) {
            r = 0;
        } else {
            li[r].style.backgroundColor = '#fff';
            r++;
        }
        li[r].style.backgroundColor = '#e9e9e9';
    }
    // 按回车发送
    if ((r < 5) && (event.keyCode == 13)) {
        console.log(r);
        seart.value = li[r].innerHTML;
        for (var i = 0, len = li.length; i < len; i++) {       // 发送后销毁
            li[i].innerHTML = '';
        }
        li[r].style.backgroundColor = '#fff';
        list.style.display = 'none';
        r = undefined;
    }
    // 文本框已有一位字母，再次按键停止提示
    if (event.keyCode != 38 && event.keyCode != 40) {
        if (seart.value.length == 1) {
            list.style.display = 'none';
            if (event.keyCode == 8 || event.keyCode == 46) {       // 文本框无字时消除数据
                for (var i = 0, len = li.length; i < len;i++) {
                    li[i].innerHTML = '';
                    li[i].style.backgroundColor = '#fff';
                }
                r = undefined;
            }
        }
    }
}

// 点击提示框
function update() {
    var event = event || window.event || arguments.callee.caller.arguments[0];
    var list = $('.search-list');
    var li = list.getElementsByTagName('li');
    var seart = $('.search-text');
    seart.value = event.target.innerHTML; 

    // 传送完，销毁提示栏信息
    for (var i = 0, len = li.length; i < len; i++) {      
        li[i].innerHTML = '';
    }
    list.style.display = 'none';
    r = undefined;
}
 
// 显示提示栏数据,n：文本框1位字符情况的值
function showData(n) {
    var list = $('.search-list');
    var li = list.getElementsByTagName('li');
    var x;
    switch (n) {
        case 'a':
            x = data.a;
            break;
        case 'b':
            x = data.b;
            break;
        case 'c':
            x = data.c;
            break;
        case 'd':
            x = data.d;
            break;
        case 'e':
            x = data.e;
            break;
        case 'f':
            x = data.f;
            break;
        case 'g':
            x = data.g;
            break;
        case 'h':
            x = data.h;
            break;
        case 'i':
            x = data.i;
            break;
        case 'j':
            x = data.j;
            break;
        case 'k':
            x = data.k;
            break;
        case 'l':
            x = data.l;
            break;
        case 'm':
            x = data.m;
            break;
        case 'n':
            x = data.n;
            break;
        case 'o':
            x = data.o;
            break;
        case 'b':
            x = data.p;
            break;
        case 'q':
            x = data.q;
            break;
        case 'r':
            x = data.r;
            break;
        case 's':
            x = data.s;
            break;
        case 't':
            x = data.t;
            break;
        case 'u':
            x = data.u;
            break;
        case 'v':
            x = data.v;
            break;
        case 'w':
            x = data.w;
            break;
        case 'x':
            x = data.x;
            break;
        case 'y':
            x = data.y;
            break;
        case 'z':
            x = data.z;
            break;
    }
    for (var i = 0, len = x.length; i < len; i++) {
        li[i].innerHTML = x[i];
    }
}