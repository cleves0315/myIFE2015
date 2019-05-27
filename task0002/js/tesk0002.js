//1.1
//判断arr是否为一个数组，返回bool值
function isArray(arr) {
    // var myArray = new Array();
    // if(myArray instanceof arr) {
    //     return true;
    // } else {
    //     return false;
    // }
    // return Array.isArray(arr);
    return Object.prototype.toString.call(arr) === "[Object Array]";
}

//判断fn是否为一个函数，返回bool值
function inFunction(fn) {
    // var myFunction = new Function();
    // if(myFunction instanceof Function) {
    //     return true;
    // } else {
    //     return false;
    // }
    return Object.prototype.toString.call(fn) === "[Object Function]";
}

//判断n是哪类基本类型
function isNer(n) {
    switch(typeof n) {
        case "Number":
            return "Number";
            break;
        case "String":
            return "String";
            break;
        case "null":
            return "null";
            break;
        case "undefined":
            return "undefined";
            break;
        case "Boolean":
            return "Boolean";
            break;
    }
}

// 2.1   JavaScript数据类型与语言基础
//使用递归来实现y一个深度克隆，可以复制一个目标d对象、返回一个完整拷贝
//被复制的对象会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等。
function cloneObject(src) {
    var abb = src;
    //Date类型
    if(src instanceof Date) {
        abb = new Date(src.getDate());
        return abb;
    }
    //Array类型
    if(src instanceof Array) {
        abb = [];
        for(var n in src) {
            abb[n] = cloneObject(src[n]);
        }
        return abb;
    }
    //Object类型
    if(src instanceof Object) {
        abb = {};
        for(var n in src) {
            if(src.hasOwnProperty(n)){
                abb[n] = cloneObject(src[n]);
            }
        }
        return abb;
    }

    //数值、字符串、布尔型、null、undefined
    return src;
}
//测试代码
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "h1"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

// console.log(abObj.a);
// console.log(abObj.b.b1[0]);

// console.log(tarObj.a);
// console.log(tarObj.b.b1[0]);

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var leng = arr.length,
        resule = arr.slice(0),
        i,m;
    // while(--leng) {
    //     for(var i=0;i<leng;i++) {
    //         if(typeof arr[i] == "string" ||typeof arr[i] == "number" ||typeof arr[leng] == "string" ||typeof arr[leng] == "number") {
    //             if(arr[i] === arr[leng]){
    //                 arr.splice(leng,1)
    //             }
    //         }
    //     }
    // }
    while(--leng) {
        m = resule[leng]
        i = leng;
        while(i--) {
            if(resule[i] === m) {
                resule.splice(leng,1);
                break;
            }
        }
    }
    return resule;
}

//使用示例
var a = [1,3,5,7,5,3];
var b = uniqArray(a);
// console.log(b); //[1,3,5,7]

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var leng = str.length -1,
        arrStr = [],
        o = 0,
        s = "";
    //字符串1v1转换数组
    for(var i=0;i <= leng; i++) {
        arrStr[i] = str.charAt(i);
    }
    //从尾处检查空白字符
    arrStr.reverse();
    while(arrStr[0] === " ") {
        arrStr.splice(0,1);
    }
    arrStr.reverse();
    //从开头检查空白字符
    while(arrStr[o] === " ") {  
        arrStr.splice(0,1);
    }
    //数组1v1转换字符串
    for(var i=0; i < arrStr.length; i++) {
        s = s + arrStr[i];
    }
    console.log(s);
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s*|\s*$/g,"");
    // return str.replace(/(^\s*)|(\s*$)|(^[\u3000]*)|([\u3000]*$)/g,"");
}
// 使用示例
var str = '   hi!  ';
str = trim(str);
// console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for(var i=0;i<arr.length;i++) {
        fn(arr[i], i);
    }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
// var arr = ['java', 'c', 'php', 'html'];
// function output(item) {
//     console.log(item);
// }
// each(arr, output);  // java, c, php, html

// 使用示例
// var arr = ['java', 'c', 'php', 'html'];
// function output(item, index) {
//     console.log(index + ': ' + item);
// }
// each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var i = 0;
    // for(var b in obj) {
    //     i++;
    // }
    for(var b in obj) {
        if(obj.hasOwnProperty(b)) {
            i++;
        }
    }
    return i;
}

// 使用示例
// var obj = {
//     a: 1,
//     b: 2,
//     c: {
//         c1: 3,
//         c2: 4
//     },
//     d:3
// };
// console.log(getObjectLength(obj)); // 3

// 判断是否为邮箱地址
function isEmail(emailStr) {
    return emailStr.search(/^[0-9a-z]\w{2,15}@[a-z0-9]{2,10}\.(com|cn)?$/i) !== -1;
}

// 判断是否为手机号
function isMobilePhone(phone) {
    return phone.search(/^1(3|4|5|8)[0-9]{9}$/) !== -1;
}


//3.1 DOM
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // element.setAttribute("class", "newClassName");
    element.className = trim(element.className +" " + newClassName);
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // element.removeAttribute("oldClassName");
    element.className = trim(element.className.replace(oldClassName, ""));
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    var parent1 = element.parentNode;
    var parent2 = siblingNode.parentNode;
    if(parent1 == parent2) {
        return true;
    } else {
        return false;
    }
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var x = element.offsetLeft;
    var y = element.offsetTop;
    var parent = element.offsetParent;
    while(parent !== null) {
        x += parent.offsetLeft;
        y += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return {
        x: x,
        y: y
    }
}

// 实现一个简单的Query
function $(selector) {
    var seles = selector.trim().replace(/\s/," ").split(" ");    //去除首位空白符， 压缩多余空白符， 字符串分组
    var len = seles.length;
        eles = [];    //存放查找结果的合集
    
    for(var i = 0;i < len; i++) {    //对分组的字符串遍历筛选查到对应对象
        var n = seles[i];
        switch(n.charAt(0)) {    //为对应的关键字符，用对应的方式查找
            case "$":    //以id查找
                eles.push(document.getElementById(n.substring(1)));
            break;
            case ".":
                eles.push(document.getElementsByClassName(n.substring(1)));
            break;
            case "[":
                //分两种情况1.有属性值  2.只有属性名
                var tags = document.getElementsByTagName("*");
                var tLen = tags.length;
                if(n.indexOf("=")) {    //判断是否有属性值
                    var t = n.substring(1, n.indexOf("=") - 1);    //获取属性名
                    var q = n.substring(n.indexOf("=") + 1, n.length-2);    //获取属性值
                    for(var j = 0;j < tLen; j++) {
                        if(tags[j].getAttribute(t) == q) {    //找到对应属性值
                            eles.push(tags[j]);
                            break;
                        }
                    }
                } else {    //没有属性值
                    var y = n.substring(1, n.length-2);    //获取属性名
                    for(var j = 0;j < tLen; j++) {
                        if(tags[j].getAttribute(y) !== null) {
                            eles.push(tags[j]);
                            break;
                        }
                    }
                }
            break;
            default:
                eles.push(document.getElementsByTagName(n)[0]);
            break;
        }
    }
    if(eles.length < 1) {    //没有找到则返回null
        return null;
    } else {
        return eles;
    }
}

// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
// console.log($("a")); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
// console.log($(".classa")); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
// console.log($("[data-log]")); // 返回第一个包含属性data-log的对象

// console.log($("[data-time=2015]")); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象


// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if(element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else {
        element.attachEvent("on" + event, listener);
    }
}

// addEvent($("#doma"), "click", clicklistener);
// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement
    if(element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    } else {
        element.detachEvent("on" + event, listener);
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
    if(element.addEventListener) {
        element.addEventListener("click", listener. false);
    } else if(element.attachEvent) {
        element.attachEvent("onclick", listener);
    } else {
        element.onclick = listener;
    }
}

// 实现对于按Enter键时的事件绑定 13
function addEnterEvent(element, listener) {
    // your implement
    var event = arguments.callee.caller.arguments[0] || window.event;
    if(event.keyCode == 13) {
        return listener;
    }
}


// 先简单一些
function delegateEvent(element, tag, eventName, listener) {    //事件代理
    // your implement
    addEvent(element, eventName, function() {
        var event = event || window.event,
            targ = event.srcElement || event.target;
        if(targ.nodeName.toLowerCase() == tag) {
            listener.call(targ, event);
        }
    });
}

$.delegate = delegateEvent;

// 使用示例
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
// $.delegate($("#list"), "li", "click", clickHandle);

// 使用示例：
// $.click("[data-log]", logListener);
// $.delegate('#list', "li", "click", liClicker);


//5.1
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
    var userAgent = navigator.userAgent.toLowerCase(),    //返回用户代理报头（浏览器相关信息）
        start, stop,    //版本号开头和结尾位置
        e;    //记录版本号
    if(userAgent.indexOf('net') != -1 && userAgent.indexOf('rv') != -1) {    //如果存在，则表明是ie
        start = userAgent.indexOf('rv');
        stop = userAgent.indexOf(')');
        e = userAgent.substring(start, stop);
        return e;
    } else {
        return -1;
    }

}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
    var d = new Date();
    d.setTime(d.getTime() + (expiredays * 24 * 60 * 60 * 1000));
    var exdays = "exdays =" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + exdays + ";path=/";
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
    var name = cookieName + "=";
    var ca = document.cookie.splice(";");
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while(c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if(c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


//6.1
// 学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：


function ajax(url, options) {
    // your implement
    var xhttp,
        myUrl,
        datas = [];
    if(window.XMLHttpRequest) {    //版本兼容
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //确定type值
    if(options.type) {
        options.type = options.type.toUpperCase();
    } else {
        options.type = "POST";
    }

    //确定data值
    if(options.data) {
        for(var item in options.data) {
            datas.push(item + "=" + encodeURI(options.data[item]));
        }
        datas.join("&");
    }

    xhttp.onreadystatechange = function() {  
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            if (options.onsuccess) {
                options.onsuccess(xhttp.responseText, xhttp.responseXML);    //链接成功执行方法
            }
        } else {
            if (options.onfail) {
                options.onfail();
            }
        }
    }
    if(options.type === "GET") {
        myUrl = url + "?" + datas;
        xhttp.open(options.type, myUrl, true);
        xhttp.send();
    } else {
        xhttp.open(options.type, url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(datas);
    }
}

// 使用示例：
// ajax(
//     'http://localhost:8080/server/ajaxtest', 
//     {
//         data: {
//             name: 'simon',
//             password: '123456'
//         },
//         onsuccess: function (responseText, xhr) {
//             console.log(responseText);
//         }
//     }
// );

// =============================================================================
window.onload = function() {
    var txt = document.getElementById("txt"),
        btn = document.getElementById("btn"),
        htxt = document.getElementsByClassName("hobby_txt")[0],
        t;
    
    addEvent(txt, "focus", function() {   //焦点
        if (txt.value == "请输入你的爱好,请用 ，分开") {
            txt.value = "";
        }
    });
    addEvent(txt, "blur", function() {
        if (!txt.value) {
            txt.value = "请输入你的爱好,请用 ，分开"
        }
    });
    addEvent(btn, "click", function() {
        t = txt.value;
        ajax(js_hobby.txt, {
            data: t,
            onsuccess: function() {
                htxt.innerHTML = this.responseText;
            }
        });
    });
}