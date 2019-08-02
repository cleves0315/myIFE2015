var time = 0;
var dele;                         // 记录删除图标所在的ele
var tpCate;                       // type 跳转 task 记录点击的任务名
var tpChildCate;
var tkTask;

// 工具函数
// 添加事件监听回调函数
function addEvent() {
    var type = document.getElementById('type');
    var task = document.getElementById('task');
    var sidebar = document.getElementById('sidebar');
    var tpLists = type.getElementsByClassName('item');
    var tkLists = task.getElementsByTagName('li');
    var tpAdd = document.getElementById('tpAddBtn');
    var tkAdd = document.getElementById('tkAddBtn');
    var dels = type.getElementsByClassName('icon-shanchu');
    var add = document.getElementsByClassName('add');
    var back = document.getElementsByClassName('back');
    var editFih = sidebar.getElementsByClassName('edit-finish')[0];
    var sidHead = sidebar.getElementsByClassName('header')[0];
    var sidHedIcon = sidHead.getElementsByClassName('iconfont');

    // type任务列表添加Touch事件
    for (var i = 0; i < tpLists.length; i++) {  
        tpLists[i].addEventListener('touchstart', tkTcStart, false);
        tpLists[i].addEventListener('touchmove', tkTcMove, false);
        tpLists[i].addEventListener('touchend', tkTcEnd, false);
        tpLists[i].addEventListener('click', pageClick, false);
    }
    // task任务列表添加Touch事件
    for (var i = 0; i< tkLists.length; i++) {
        tkLists[i].addEventListener('touchstart', tkTcStart, false);
        tkLists[i].addEventListener('touchmove', tkTcMove, false);
        tkLists[i].addEventListener('touchend', tkTcEnd, false);
        tkLists[i].addEventListener('click', pageClick, false);
    }
    // type、task 添加按钮的click事件
    tpAdd.addEventListener('click', addType, false);
    tkAdd.addEventListener('click', addTask, false);
    // type 删除按钮click事件
    for (var i = 0; i < dels.length; i++) {
        dels[i].addEventListener('click', delType, false);
    }
    // task、sidebar 返回按钮click事件
    for (var i = 0; i < back.length; i++) {
        back[i].addEventListener('click', comeBack, false);
    }
    // sidebar header按钮click事件
    sidHead.addEventListener('click', sidFunt, false);
    // 各页面添加、返回、完成按钮Touch事件
    add[0].addEventListener('touchstart', btnStart, false);
    add[1].addEventListener('touchstart', btnStart, false);
    back[0].addEventListener('touchstart', btnStart, false);
    back[1].addEventListener('touchstart', btnStart, false);
    add[0].addEventListener('touchend', btnEnd, false);
    add[1].addEventListener('touchend', btnEnd, false);
    back[0].addEventListener('touchend', btnEnd, false);
    back[1].addEventListener('touchend', btnEnd, false);
    if (editFih) {
        editFih.addEventListener('touchstart', btnStart, false);
        editFih.addEventListener('touchend', btnEnd, false);
    }
    // sidebar 编辑与完成按钮 touch
    if (sidHedIcon.length != 0) {
        sidHedIcon[0].addEventListener('touchstart', sidIcoStart, false);
        sidHedIcon[1].addEventListener('touchstart', sidIcoStart, false);
        sidHedIcon[0].addEventListener('touchend', sidIcoEnd, false);
        sidHedIcon[1].addEventListener('touchend', sidIcoEnd, false);
    }
}

// 显示task列表数据
function lockTask(task) {
    // var task = JSON.parse(localStorage.getItem('task'));
    var tkHtml = '';
    var tkDates = [];
    var b = 0;
    for (var i = 0; i < task.length; i++) {
        if (task[i].parent == tpCate && task[i].id == tpChildCate) {
            // 判断日期是否重复
            for (var j = 0; j < tkDates.length; j++) {
                if (task[i].date == tkDates[j]) {
                    break;
                }
                b = j + 1;
            }
            if (tkDates.length == 0) {                 // 页面还没生成数据
                tkDates.push(task[i].date);
                tkHtml += '<h3 class="date">' + task[i].date + '</h3>'
                        + '<ul class="list">';
                
            } else if (b == tkDates.length) {           // 日期没重复
                tkDates.push(task[i].date);
                tkHtml += '</ul>'
                        + '<h3 class="date">' + task[i].date + '</h3>'
                        + '<ul class="list">';
            }
            if (task[i].state == 'yes') {
                tkHtml += '<li><a class="finish" href="#sidebar">' + task[i].name + '</a><span class="iconfont icon-check"></span></li>';
            } else {
                tkHtml += '<li><a href="#sidebar">' + task[i].name + '</a></li>';
            }
        }
    }
    tkHtml += '</ul>';
    return tkHtml;
}

// 显示页面-----将storage里的数据导出
function showGTD() {
    var storage = window.localStorage;
    var tpList = document.getElementById('tpList');
    var tkCont = document.getElementById('task').getElementsByClassName('content')[0];
    var sidHedRight = document.getElementById('sidebar').getElementsByClassName('header-right')[0];
    var sidCont = document.getElementById('sidebar').getElementsByClassName('content')[0];
    var cate = storage.getItem('cate');
    var childCate = storage.getItem('childcate');
    var task = storage.getItem('task');
    var record = storage.getItem('record');               // 记录初始值（判断是否第一次加载页面）
    var cateText = [
        {
            "id": 0,
            "name": '默认分类',
            "child": [0, 0]
        },
        {
            "id": 1,
            "name": '百度IFE',
            "child": [3, 1]
        }
    ];
    var childCateText = [
        {
            "id": 0,
            "name": 'task0001',
            "parent": 1
        },
        {
            "id": 1,
            "name": 'task0002',
            "parent": 1
        },
        {
            "id": 2,
            "name": 'task0003',
            "parent": 1
        }
    ];
    var taskText = [
        {
            "id": 0,
            "date": "2019-05-23",
            "name": "to-do-1",
            "state": "yes",
            "content": "完成task0001编码工作",
            "parent": 1
        },
        {
            "id": 1,
            "date": "2019-05-24",
            "name": "to-do-2",
            "state": "yes",
            "content": "完成task0002编码工作",
            "parent": 1
        },
        {
            "id": 2,
            "date": "2019-05-28",
            "name": "to-do-3",
            "state": "no",
            "content": "深度学习JavaScript，仔细掌握作用域、原型、闭包等概念，掌握一些基本的设计模式",
            "parent": 1
        }
    ];
    var html = '';
    if (record) {
        cate = JSON.parse(cate);
        childCate = JSON.parse(childCate);
        task = JSON.parse(task);
    } else {
        cate = cateText;
        childCate = childCateText;
        task = taskText;
        // 不存在record表明第一次加载页面， 进行存储到storage
        storage.clear();
        record = 1;
        cate = JSON.stringify(cate);
        childCate = JSON.stringify(childCate);
        task = JSON.stringify(task);
        record = JSON.stringify(record);
        storage.setItem('cate', cate);
        storage.setItem('childcate', childCate);
        storage.setItem('record', record);
        storage.setItem('task', task);
        cate = JSON.parse(cate);
        childCate = JSON.parse(childCate);
        task = JSON.parse(task);
    }
    // 显示type页面
    for (var i = 0; i < cate.length; i++) {
        html += '<li class="line">'
                + '<h2 class="title">'
                + '<span class="iconfont icon-folder-open"></span>';
        if (i == 0) {
            html += '<span class="title-text">' + '默认分类' + '</span>'
                    + '</h2><ul class="line-nav">';
        } else {
            html += '<span class="title-text">' + cate[i].name + '</span>'
                    + '<span class="iconfont icon-shanchu"></span>' 
                    + '</h2><ul class="line-nav">';
        }
        if (childCate) {
            for (var j = 0; j < childCate.length; j++) {
                if (childCate[j].parent == cate[i].id) {
                    html += '<li class="item">' +
                                '<a href="#task">'+ childCate[j].name + '</a>' +
                            '</li>';
                }
            }
        }
        html += '</ul></li>'
    }
    tpList.innerHTML = html;
    // 显示task页面
    if (task) {
        var tkHtml = '';
        // tpCate、tpChildCate type页面点击任务后作为传递的参数
        if (tpCate || tpCate == 0) {
            // 显示task数据
            tkHtml = lockTask(task);
            tkCont.innerHTML = tkHtml;
        }
    }
    // 显示sidebar页面
    if (task) {
        sidHedRight.innerHTML = '<span class="iconfont icon-bianji1"></span>' +
                                '<span class="iconfont icon-wancheng"></span>';
        for (var i = 0; i < task.length; i++) {
            if (task[i].parent == tpCate && task[i].id == tpChildCate && task[i].name == tkTask) {
                sidCont.innerHTML = '<h4 class="date">' + task[i].date + '</h4>' +
                                    '<div class="text">' + task[i].content + '</div>';
                break;
            }
        }
    }

    // 添加事件监听
    addEvent();
    // storage.clear();
}

// -----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

// type、task TouchStart事件
function tkTcStart(event) {
    var event = event || window.event;
    var hide = document.getElementById('hide');
    var ele = event.target;
    if (ele.nodeName == 'A') {
        // 列表点击样式
        ele.id = 'strA';                          // start：点击高亮样式
        time = setTimeout(() => {
            event.preventDefault();
            dele = ele.parentNode;
            ele.id = '';
            time = 0;
        }, 300);
    } else if (ele.nodeName == 'SPAN') {
        // 删除按钮点击样式
    } else if (ele.className == 'title-item') {
        // 状态栏点击样式
        hide.id = '';
        ele.id = 'hide';
    }
}

// 添加、返回、完成按钮TouchStart样式
function btnStart(event) {
    var ele = event.target;
    if (ele.className == 'back' || ele.className == 'edit-finish') {
        ele.id = 'strA';
    }
}

// sidebar编辑、完成按钮Touchstart样式
function sidIcoStart(event) {
    var ele = event.target;
    if (ele.className == 'iconfont icon-wancheng') {
        ele.id = 'scale';
    }
}

// type、task TouchMove
function tkTcMove(event) {
    var event = event || window.event;
    clearTimeout(time);
    if (event.target.nodeName == 'A') {
        event.target.id = '';
    }
}

// type、task TouchEnd
function tkTcEnd(event) {
    var event = event || window.event;
    var ele = event.target;
    clearTimeout(time);
    if (ele.nodeName == 'A') {
        event.target.id = '';                    // 清除点击样式
        if (time == 0) {
            // 长按事件
            event.preventDefault();
            ele.parentNode.innerHTML += '<span class="dele">删除</span>';
        }
    }
}

// 添加、返回、完成按钮TouchEnd样式
function btnEnd(event) {
    var ele = event.target;
    if (ele.className == 'back' || ele.className == 'edit-finish') {
        ele.id = '';
    }
}

// sidebar编辑、完成按钮Touchstart样式
function sidIcoEnd(event) {
    var ele = event.target;
    if (ele.className == 'iconfont icon-wancheng') {
        ele.id = '';
    }
}

// type、task list Click事件
function pageClick(event) {
    var event = event || window.event;
    var ele = event.target;
    var cate = JSON.parse(localStorage.getItem('cate'));
    var childCate = JSON.parse(localStorage.getItem('childcate'));
    var task = JSON.parse(localStorage.getItem('task'));
    var id, cId;                         // id: cate.id    cId: childcate.id
    // 删除按钮click
    if (ele.className == 'dele') {
        if (confirm('删除数据将无法恢复！')) {
            if (location.hash == '') {                     // type页面删除按钮
                // 删除childcate
                // 获得cate对应id
                var name = ele.previousElementSibling.innerHTML;
                var pName = ele.parentNode.parentNode.previousElementSibling.getElementsByClassName('title-text')[0].innerHTML;
                // 获取id
                for (var i = 0; i < cate.length; i++) {
                    if (cate[i].name == pName) {
                        id = cate[i].id;
                        break;
                    }
                }
                // 删除选中任务名对应childcate
                for (var i = 0; i < childCate.length; i++) {
                    if (childCate[i].name == name && childCate[i].parent == id) {
                        cId = childCate[i].id;
                        childCate.splice(i, 1);
                        childCate = JSON.stringify(childCate);
                        localStorage.setItem('childcate', childCate);
                        break;
                    }
                }
                // 删除对应task数据
                if (task) {
                    for (var i = 0; i < task.length; i++) {
                        if (task[i].parent == id && task[i].id == cId) {
                            task.splice(i, 1);
                        }
                    }
                    task = JSON.stringify(task);
                    localStorage.setItem('task', task);
                }
            } else if (location.hash == '#task') {                     // task页面删除按钮
                var name = ele.parentNode.getElementsByTagName('a')[0].innerHTML;
                // 循环查找对应name task值  找到后删除
                for (var i = 0; i < task.length; i++) {
                    if (task[i].parent == tpCate && task[i].id == tpChildCate && task[i].name == name) {
                        task.splice(i, 1);
                        break;
                    }
                }
                task = JSON.stringify(task);
                localStorage.setItem('task', task);
            }
            // 删除后重新显示页面
            showGTD();
        }
    }
    // task 状态栏点击事件
    if (ele.className == 'title-item') {
        var tkCont = document.getElementById('task').getElementsByClassName('content')[0];
        var html = '';
        var y = [];                // 存储已完成 task
        var n = [];                // 存储未完成 task
        // 记录各完成状态对应元素
        if (task) {
            for (var i = 0; i < task.length; i++) {
                if (task[i].state == 'yes') {
                    y.push(task[i]);
                } else {
                    n.push(task[i]);
                }
            }
        }
        if (ele.innerHTML == '所有') {
            html = lockTask(task);
        } else if (ele.innerHTML == '未完成') {
            html = lockTask(n);
        } else if (ele.innerHTML == '已完成') {
            html = lockTask(y);
        }
        tkCont.innerHTML = html;
    }
    // click事件触发页面跳转，记录上个页面storage值
    if (ele.hash == '#task') {
        // type转task
        tpCate = ele.innerHTML;
        for (var i = 0; i < childCate.length; i++) {
            if (childCate[i].name == tpCate) {
                tpCate = childCate[i].parent;
                tpChildCate = childCate[i].id;
                break;
            }
        }
    }
    // task页面跳转 记录点击的对应task数据
    if (ele.hash == '#sidebar') {
        tkTask = ele.innerHTML;
    }
}

// 清除删除图标
window.ontouchstart = function (event) {
    var ele = event.target;
    if (dele && ele.className != 'dele') {
        dele.removeChild(dele.lastChild);
        dele = null;
    }
}

// 清除删除图标
window.onclick = function () {
    if (dele) {
        dele.removeChild(dele.lastChild);
        dele = null;
    }
}

// add cate、childcate
function addType() {
    var type = document.getElementById('type');
    var titTxt = type.getElementsByClassName('title-text');
    var name = prompt('请输入要添加的任务分类', '默认分类');
    var storage = window.localStorage;
    var cate = storage.getItem('cate');
    var cate = JSON.parse(cate);
    var childCate = JSON.parse(localStorage.getItem('childcate'));
    var cateText = {};
    var childCateText = {};
    var l = 0;
    var n, num, id, x;           // num: 重复的分类名在DOM节点对应的序号(0开始计算)  id：num对应的cate数据里的id   n：判断输入的分类名是否重复   l：判断输入的任务名是否重复   x: cate子类childcate最后一位子类的id
    if (name && name.trim() && name.length < 10) {
        var cName = prompt('请输入任务名');
        // 判断分类名是否重复
        for (var i = 0; i < titTxt.length; i++) {
            if (name == titTxt[i].innerHTML) {
                num = i;
                break;
            }
            n = i + 1;                          // 计数 (循环顺利执行完表示没有找到)
        }
        for (var i = 0; i < cate.length; i++) {
            if (name == cate[i].name) {
                id = cate[i].id;
            }
        }
        if (cName && cName.trim()) {
            // 分类名、任务类名都输入
            // 添加数据
            // 界面存在输入的分类名
            if (n != titTxt.length) {
                var nav = titTxt[num].parentNode.nextElementSibling;
                var items = nav.getElementsByClassName('item');
                // 判断是否与已有的任务名冲突
                for (var i = 0; i < items.length; i++) {
                    if (cName == items[i].getElementsByTagName('a')[0].innerHTML) {
                        alert('该任务名已存在。');
                        break;
                    }
                    l = i + 1;
                }
                if (l == items.length) {
                    cate[id].child[0] += 1;
                    cate[id].child[1] += 1;
                    for (var i = 0; i < childCate.length; i++) {
                        if (childCate[i].parent == id) {
                            x = childCate[i].id;
                        }
                    }
                    childCateText.parent = id;
                    childCateText.name = cName;
                    if (x) {
                        childCateText.id = x + 1;
                    } else {
                        childCateText.id = 0;
                    }
                    // 同步数据到storage
                    childCate.push(childCateText);
                }
            } else if (n == titTxt.length) {                   // 界面不存在输入的分类名
                cateText.id = cate[cate.length - 1].id + 1;
                cateText.name = name;
                cateText.child = [1, 1];

                childCateText.id = 0;
                childCateText.name = cName;
                childCateText.parent = cateText.id;
                // 同步数据到storage
                cate.push(cateText);
                if (childCate) {
                    childCate.push(childCateText);
                } else {
                    childCate = childCateText;
                }
            }
            cate = JSON.stringify(cate);
            childCate = JSON.stringify(childCate);
            localStorage.setItem('cate', cate);
            localStorage.setItem('childcate', childCate);
            // 显示页面
            showGTD();
        } else {
            // 只输入了分类名
            // 分类名不重复
            if (n == titTxt.length) {
                cateText.id = cate[cate.length - 1].id + 1;
                cateText.name = name;
                cateText.child = [0, 0];
                cate.push(cateText);
                cate = JSON.stringify(cate);
                localStorage.setItem('cate', cate);
                // 显示页面
                showGTD();
            } else {
                // 分类名重复
                alert('当前分类名已存在，请重新输入或输入任务名');
            }
        }
    } else if (name && name.length > 10) {
        alert('输入的字符不能大于10位数');
    }
}

// add task
function addTask() {
    var d = new Date();
    var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    var uDate = prompt('请输入日期', date);
    var r = /^\d{4}-\d{1,2}-\d{1,2}$/;
    var task = JSON.parse(localStorage.getItem('task'));
    var taskText = {};
    var name;
    var n = 0;
    if (uDate) {
        uDate = uDate.trim();
        if (r.test(uDate)) {           // 日期格式正确
            name = prompt('请输入课程名');
            console.log(name.length);
            if (name && name.length <= 10) {             // 输入了课程名
                // 判断输入的课程名是否重复
                for (var i = 0; i < task.length; i++) {
                    if (task[i].parent == tpCate && task[i].id == tpChildCate) {
                        if (task[i].name == name) {
                            break;
                        }
                    }
                    n = i + 1;
                }
                if (n == task.length) {
                    // 输入的课程名不重复
                    taskText.id = tpChildCate;
                    taskText.date = uDate;
                    taskText.name = name;
                    taskText.state = 'no';
                    taskText.content = '';
                    taskText.parent = tpCate;
                    task.push(taskText);
                    task = JSON.stringify(task);
                    localStorage.setItem('task', task);
                    // 显示数据
                    showGTD();
                } else {
                    alert('输入的课程名重复！');
                }
            } else {                // 没有输入课程名
                alert('用户取消或没有输入，输入的字符长度小于10个字符');
            }
        } else {
            alert('请输入正确日期格式: xxxx-x-x');
        }
    }
}

// type删除按钮
function delType(event) {
    var ele = event.target;
    var name = ele.previousElementSibling.innerHTML;
    var cate = JSON.parse(localStorage.getItem('cate'));
    var childCate = JSON.parse(localStorage.getItem('childcate'));
    var task = JSON.parse(localStorage.getItem('task'));
    var id;
    if (confirm('删除数据将无法恢复！')) {
        // 删除cate数据
        for (var i = 0; i < cate.length; i++) {
            if (cate[i].name == name) {
                id = cate[i].id;
                cate.splice(i, 1);
                break;
            }
        }
        cate = JSON.stringify(cate);
        localStorage.setItem('cate', cate);
        // 删除childcate数据
        for (var i = 0; i < childCate.length; i++) {
            if (childCate[i].parent == id) {
                childCate.splice(i, 1);
                i--;
            }
        }
        childCate = JSON.stringify(childCate);
        localStorage.setItem('childcate', childCate);
        // 删除task数据
        for (var i = 0; i < task.length; i++) {
            if (task[i].parent == id) {
                task.splice(i, 1);
                i--;
            }
        }
        task = JSON.stringify(task);
        localStorage.setItem('task', task);
    }
    // 显示页面
    showGTD();
}

// task、sidebar 返回按钮 click
function comeBack() {
    var sidebar = document.getElementById('sidebar');
    var sidHedRight = sidebar.getElementsByClassName('header-right')[0];
    var sidCont = sidebar.getElementsByClassName('content')[0];
    var sidFish = sidebar.getElementsByClassName('edit-finish')[0];
    var task = JSON.parse(localStorage.getItem('task'));
    var num;
    // 找出当前展示的task所在序号
    for (var i = 0; i < task.length; i++) {
        if (task[i].parent == tpCate && task[i].id == tpChildCate && task[i].name == tkTask) {
            num = i;
            break;
        }
    }
    if (sidFish) {
        // sidebar界面编辑时，点击返回
        sidHedRight.innerHTML = '<span class="iconfont icon-bianji1"></span>' +
                                '<span class="iconfont icon-wancheng"></span>';
        sidCont.innerHTML = '<h4 class="date">' + task[num].date + '</h4>' +
                            '<div class="text">' + task[num].content + '</div>';
    } else {
        history.back();
    }
}

// sidebar header按钮组click事件
function sidFunt(event) {
    var sidebar = document.getElementById('sidebar');
    var sidHedRight = sidebar.getElementsByClassName('header-right')[0];
    var sidCont = sidebar.getElementsByClassName('content')[0];
    var edtDate = sidebar.getElementsByClassName('edit-date')[0];
    var edtTxt = sidebar.getElementsByClassName('edit-text')[0];
    var task = JSON.parse(localStorage.getItem('task'));
    var event = event || window.event;
    var ele = event.target;
    var num;
    // 获得task在数组中的位置
    for (var i = 0; i < task.length; i++) {
        if (task[i].parent == tpCate && task[i].id == tpChildCate && task[i].name == tkTask) {
            num = i;
            break;
        }
    }
    if (ele.className == 'iconfont icon-bianji1') {                     
        // 编辑按钮
        sidHedRight.innerHTML = '<div class="edit-finish">完成</div>';
        sidCont.innerHTML = '<input class="edit-date" type="text" value="' + task[num].date + '">' +
                            '<textarea class="edit-text">' + task[num].content + '</textarea>';
        // 添加事件监听
        addEvent();
    } else if (ele.className == 'iconfont icon-wancheng') {
        // ✔打勾按钮
        task[num].state = 'yes';
        task = JSON.stringify(task);
        localStorage.setItem('task', task);
    } else if (ele.className == 'edit-finish') {
        // 完成编辑按钮
        // 判断更改的日期格式是否正确
        var r = /^\d{4}-\d{1,2}-\d{1,2}$/;
        if (r.test(edtDate.value)) {
            task[num].date = edtDate.value;
            task[num].content = edtTxt.value;
            sidHedRight.innerHTML = '<span class="iconfont icon-bianji1"></span>' +
                                    '<span class="iconfont icon-wancheng"></span>';
            sidCont.innerHTML = '<h4 class="date">' + task[num].date + '</h4>' +
                                '<div class="text">' + task[num].content + '</div>';
            task = JSON.stringify(task);
            localStorage.setItem('task', task);
        } else {
            alert('请输入正确日期格式: xxxx-x-x');
        }
        // 添加事件监听
        addEvent();
    } else if (ele.className == 'back') {
        // 返回按钮
        // comeBack();
    }
}

// 切换页面(锚点改变)
window.onhashchange = function(hashObj) {
    var oldHash = hashObj.oldURL.split('#')[1];
    var newHash = hashObj.newURL.split('#')[1];
    var type = document.getElementById('type');
    var task = document.getElementById('task');
    var sidebar = document.getElementById('sidebar');
    var show = document.getElementsByClassName('show')[0];
    if (newHash == 'task') {
        // 隐藏旧页面
        show.className = show.className.split(' ')[0];
        // 显示新页面
        task.className += ' show';
    } else if (newHash == 'sidebar') {
        show.className = show.className.split(' ')[0];
        sidebar.className += ' show';
    } else if (!newHash) {
        show.className = show.className.split(' ')[0];
        type.className += ' show';
    }
    // 显示页面
    showGTD();
}

window.onload = function () {
    // var cate = JSON.parse(localStorage.getItem('cate'));
    // var childCate = JSON.parse(localStorage.getItem('childcate'));
    // var task = JSON.parse(localStorage.getItem('task'));
    // console.log(cate);
    // console.log(childCate);
    // console.log(task);
    // localStorage.clear();
    // 初始化页面锚点
    if (location.hash) {
        location.href = location.host;
    }
    showGTD();   // 显示页面
}
