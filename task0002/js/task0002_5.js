// 用什么方式划分区域
// 用什么方式移动元素       draggable 属性
// 用什么方式插入元素!!
// border使用全边框还是？!!   margin: -1px;
// 元素布局时什么样？!!     ol 有序列表，li绝对定位  在js设置li位置
// 在运用一些函数或者事件时，最好先看下对应的文献（你会有意想不到的收获）

window.onload = function () {
    var minBox = document.getElementsByClassName('min-bok');
    for (var i = 0, len = minBox.length; i < len; i++) {
        minBox[i].onmousedown = dargBok;
    }
}

function dargBok() {
    var event = event || window.event || arguments.callee.caller.arguments[0];
    var ele = event.target;
    var n = setPosition(ele);
    var diffX = event.clientX - n.left;        // 鼠标位置与小方块左上角位置差
    var diffY = event.clientY - n.top;
    var poinX = n.left - ele.offsetLeft;        // 元素父级坐标
    var poinY = n.top - ele.offsetTop;
    document.onmousemove = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        var posX = e.clientX - diffX - poinX;        // 元素位于父级坐标
        var posY = e.clientY - diffY - poinY;
        ele.className = 'move-bok';
        ele.style.left = posX + 'px';
        ele.style.top = posY + 'px';
        document.onmouseup = function () {
            ele.className = 'min-bok';
            document.onmousemove = null;
            var wrapBok = document.getElementsByClassName('bok-wrap');
            var wBokdis1 = setPosition(wrapBok[0]);
            var wBokdis2 = setPosition(wrapBok[1]);
            var region1 = wBokdis1.left + 150 + 5;        // 边界
            var region2 = wBokdis2.left + 150 + 5;
            var relX = posX + poinX;        // 元素与body的距离
            // 放入元素
            if (relX < region1) {        // wrapBok[0]区域
                var divs1 = wrapBok[0].getElementsByTagName('div');
                if (divs1.length == 0) {
                    wrapBok[0].appendChild(ele);
                }
                for (var i = 0, len = divs1.length; i < len; i++) {
                    if (posY < divs1[i].offsetTop && (divs1.length < 10)) {
                        wrapBok[0].insertBefore(ele, wrapBok[0].childNodes[i * 2]);         // *2 因为空文本节点
                        break;
                    } else if (divs1.length < 10) {
                        wrapBok[0].appendChild(ele);
                    }
                }
            } else if (relX >= region1 && relX < region2) {            // wrapBok[1]
                var divs2 = wrapBok[1].getElementsByTagName('div');
                if (divs2.length == 0) {
                    wrapBok[1].appendChild(ele);
                }
                for (var i = 0, len = divs2.length; i < len; i++) {
                    if (posY < divs2[i].offsetTop && (divs2.length < 10)) {
                        wrapBok[1].insertBefore(ele, wrapBok[1].childNodes[i * 2]);
                        break;
                    } else if (divs2.length < 10) {
                        wrapBok[1].appendChild(ele);
                    }
                }
            } else if (relX >= region2) {        // wrapBok[2]
                var divs3 = wrapBok[2].getElementsByTagName('div');
                if (divs3.length == 0) {
                    wrapBok[2].appendChild(ele);
                }
                for (var i = 0, len = wrapBok[2].getElementsByTagName('div').length; i < len; i++) {
                    if (posY < divs3[i].offsetTop && (divs3.length < 10)) {
                        wrapBok[2].insertBefore(ele, wrapBok[2].childNodes[i * 2]);
                        break;
                    } else if (divs3.length < 10) {
                        wrapBok[2].appendChild(ele);
                    }
                }
            }
        }
    }
}

// 获得element位置
function setPosition(ele) {
    var parent = ele.offsetParent;
    var n = {
        left: ele.offsetLeft,
        top: ele.offsetTop
    };
    while (parent) {
        n.left = n.left + parent.offsetLeft;
        n.top = n.top + parent.offsetTop;
        parent = parent.offsetParent;
    }
    return n;
}

