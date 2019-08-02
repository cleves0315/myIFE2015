// 2019/06/19
// 使用localStorage + JSON存储数据
// cate: 父分类     childCate：子分类     e：删除按钮对应的li    task: 任务分类

// 2019/06/27   0：00 设置删除分类同步localStorage数据
// 2019/06/27   12：30 
// 2019/06/27   23:14 设置任务列表与右侧编辑栏操作同步localStorage数据
var storage = window.localStorage;
var e;
var cate;
var childCate;
var cateText = [
    {
        "id": 0,
        "name": "默认分类",
        "child": [0, 0]
    },
    {
        "id": 1,
        "name": "百度IFE",
        "child": [1, 0]
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
var task = [
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

window.onload = function () {
    var tpDelCancel = document.getElementsByClassName('type-delete-cancel')[0];
    var tpDelSure = document.getElementsByClassName('type-delete-sure')[0];
    var tpList = document.getElementsByClassName('type-list')[0];
    var html;
    tpDelCancel.onclick = cancelDelTpList;
    tpDelSure.onclick = sureDelTpList;
    // storage.clear();
    if (storage.getItem('cate')) {                         // 如有已存数据，拿出创建分类列表
        var dataText = storage.getItem('cate');
        var data = JSON.parse(dataText);                   // cate:[{id:2, name:21, child:0}{id:3, name:数学, child:[1,1]}]
        for (var i = 0; i < data.length; i++) {
            var li = document.createElement('li');
            html = '<h4 class="type-list-tt" onclick="tpListTitleShow()">'
                            + '<span class="iconfont icon-folder-open"></span>'
                            + '<span class="type-list-tt-text">'+ data[i].name +'</span>'
                            + '<span class="type-list-tt-num">'+ '(' + data[i].child[0] + ')' +'</span>';
            if (i == 0) {
                html += '</h4><ul>';
            } else {
                html += '<span class="iconfont icon-shanchu" onclick="tpListDelete(event)"><\/span>'
                        + '</h4>'
                        + '<ul>';
            }
            if (storage.getItem('childcate')) {
                var childDataText = storage.getItem('childcate');
                var childData = JSON.parse(childDataText);          // childCate:[{id:0, name:单元1, parent:3}, {id:1, name:单元2, parent:3}]
                for (var j = 0; j < childData.length; j++) {
                    if (childData[j].parent == data[i].id) {
                        html += '<li class="type-list-item" onclick="tpListItemShow(event)">'
                                        + '<span class="iconfont icon-file-text"></span>'
                                        + '<span class="type-list-item-text">' + childData[j].name + '</span>'
                                        + '<span class="iconfont icon-shanchu" onclick="tpListDelete(event)"></span>'
                                        + '</li>';
                    }
                }
            }
            html += '</ul>';
            li.innerHTML = html;
            li.className = 'type-list-mark';
            tpList.appendChild(li);


        }
    } else {                                     // 初始下 自动创建默认分类 并存入localStorage第一位
        var li1 = document.createElement('li');
        li1.innerHTML =  '<h4 class="type-list-tt type-list-tt-focus" onclick="tpListTitleShow()">'
                        + '<span class="iconfont icon-folder-open"></span>'
                        + '<span class="type-list-tt-text">默认分类</span>'
                        + '<span class="type-list-tt-num">(0)</span>'
                        + '</h4>' 
                        + '<ul></ul>';
        li1.className = 'type-list-mark';
        tpList.appendChild(li1);
        var li2 = document.createElement('li');
        li2.innerHTML = '<h4 class="type-list-tt" onclick="tpListTitleShow(event)">'
                        + '<span class="iconfont icon-folder-open"><\/span>'
                        + '<span class="type-list-tt-text">百度IFE</span>'
                        + '<span class="type-list-tt-num">(3)</span>'
                        + '<span class="iconfont icon-shanchu" onclick="tpListDelete(event)"><\/span>'
                        + '</h4>'
                        + '<ul>'
                        + '<li class="type-list-item" onclick="tpListItemShow(event)">'
                        + '<span class="iconfont icon-file-text"></span>'
                        + '<span class="type-list-item-text">task0001</span>'
                        + '<span class="iconfont icon-shanchu" onclick="tpListDelete(event)"></span>'
                        + '<li class="type-list-item" onclick="tpListItemShow(event)">'
                        + '<span class="iconfont icon-file-text"></span>'
                        + '<span class="type-list-item-text">task0002</span>'
                        + '<span class="iconfont icon-shanchu" onclick="tpListDelete(event)"></span>'
                        + '<li class="type-list-item" onclick="tpListItemShow(event)">'
                        + '<span class="iconfont icon-file-text"></span>'
                        + '<span class="type-list-item-text">task0003</span>'
                        + '<span class="iconfont icon-shanchu" onclick="tpListDelete(event)"></span>'
                        + '</li></ul>'
        li2.className = 'type-list-mark';
        tpList.appendChild(li2);

        cate = JSON.stringify(cateText);
        childCate = JSON.stringify(childCateText);
        task = JSON.stringify(task);
        storage.setItem('cate', cate);
        storage.setItem('childcate', childCate);
        storage.setItem('task', task);
    }
    // storage.clear();  
    // 初始类选择样式
    var ul = tpList.getElementsByTagName('ul');
    var tt = document.getElementsByClassName('type-list-tt')[0];
    tt.className += ' type-list-tt-focus';
    if (ul.length != 0) {
        for (var i = 0; i < ul.length; i++) {
            ul[i].style.display = 'none';
        }
        ul[0].style.display = 'block';
    }
}

// 父类名被点击
function tpListTitleShow(event) {
    var event = event || window.event || arguments.callee.caller.arguments[0];
    var tt = document.getElementsByClassName('type-list-tt');
    var li = document.getElementsByClassName('type-list-item');
    var tpList = document.getElementsByClassName('type-list')[0];
    var ul = tpList.getElementsByTagName('ul');
    var taskName = document.getElementById('sidebar-header-content');
    var taskDate = document.getElementById('sidebar-date-content');
    var taskContent = document.getElementById('sidebar-content-text');
    var taskList = document.getElementById('task-list');
    var ele = event.target;
    if (ele.nodeName != 'H4') {
        ele = ele.parentNode;
    }
    var showUl = ele.nextSibling;
    while (showUl.nodeName != 'UL') {
        showUl = showUl.nextSibling;
    }

    for (var i = 0; i < tt.length; i++) {
        // 初始化样式
        tt[i].className = 'type-list-tt';
    }
    
    // 初始化侧栏任务详细信息
    while (taskList.lastChild) {
        taskList.removeChild(taskList.lastChild);
    }
    cancleTaskEdit();
    taskName.innerHTML = '';
    taskDate.innerHTML = '';
    taskContent.innerHTML = '';
    for (var i = 0; i < ul.length; i++) {
        // 关闭所有子类名
        ul[i].style.display = 'none';
    }
    for (var i = 0; i < li.length; i ++) {
        // 清空子类被选中样式
        li[i].style.backgroundColor = '';
    }

    ele.className += ' type-list-tt-focus';    
    showUl.style.display = 'block';                                 // 显示被选中父类的子类
}

// 子类名被点击
function tpListItemShow(event) {
    var taskUl = document.getElementById('task-list');
    taskUl.style.display = 'block';
    var event = event || window.event || arguments.callee.caller.arguments[0];
    var tpLi = document.getElementsByClassName('type-list-item');
    var taskName = document.getElementById('sidebar-header-content');
    var taskDate = document.getElementById('sidebar-date-content');
    var taskContent = document.getElementById('sidebar-content-text');
    var tkHdNav = document.getElementById('task-header-nav');
    var tkSteList = tkHdNav.getElementsByTagName('li');
    var ele = event.target;
    var num, 
        name,
        html,
        parent,
        c = [],
        b = false;
    // 初始化样式、设置样式
    for (var i = 0; i < tpLi.length; i++) {
        tpLi[i].style.backgroundColor = '';
    }
    if (ele.nodeName != 'LI') {
        ele = ele.parentNode;
    }
    ele.style.backgroundColor = '#64f570';
    // 初始化任务栏列表数据
    while (taskUl.lastChild) {
        taskUl.removeChild(taskUl.lastChild);
    }
    // 初始化侧栏任务详细信息
    cancleTaskEdit();
    taskName.innerHTML = '';
    taskDate.innerHTML = '';
    taskContent.innerHTML = '';
    // 初始化任务状态栏
    for (var i = 0; i < tkSteList.length; i++) {
        tkSteList[i].className = '';
        if (i == 0) {
            tkSteList[i].className = 'task-state-focus';
        }
    }
    // 记录所点击的序号
    cate = JSON.parse(storage.getItem('cate'));
    childCate = JSON.parse(storage.getItem('childcate'));
    for (var i = 0; i < tpLi.length; i++) {
        if (tpLi[i].style.backgroundColor) {
            name = tpLi[i].parentNode.previousElementSibling.getElementsByClassName('type-list-tt-text')[0].innerHTML;
            for (var j = 0; j < cate.length; j++) {
                if (cate[j].name == name) {
                    parent = cate[j].id;
                }
            }
            name = tpLi[i].getElementsByClassName('type-list-item-text')[0].innerHTML;
            for (var j = 0; j < childCate.length; j++) {
                if (childCate[j].name == name && childCate[j].parent == parent) {
                    num = childCate[j].id;
                    break;
                }
            }
            break;
        }
    }
    // 显示任务栏列表数据
    if (storage.getItem('task')) {
        task = JSON.parse(storage.getItem('task'));
        for (var i = 0; i < task.length; i++) {
            if (c.length > 0) {
                for (var l = 0; l < c.length; l++) {
                    if (c[l] == i) {
                        b = true;
                        break;
                    }
                }
            }
            // 重复日期项则跳过
            if (!b) {
                if (task[i].id == num && task[i].parent == parent) {
                    // date、name、state
                    var li = document.createElement('li');
                    if (task[i].state == 'yes') {
                        li.className = 'task-list-finish';
                    } else {
                        li.className = 'task-list-notfinish';
                    }
                    html = '<h4 class="task-list-tt">' + task[i].date + '</h4>'
                            + '<ul class="task-list-item">';
                    for (var j = 0; j < task.length; j++) {
                        if (task[j].id == num && task[j].date == task[i].date && task[j].state == 'no') {
                            html +='<li class="task-list-item-line">'
                                    + '<span class="task-list-item-dd">' + task[j].name + '</span>'
                                    + '<span class="iconfont icon-check"></span>'
                                    + '<span class="iconfont icon-shanchu"></span>'
                                    + '</li>';
                            c.push(j);
                        } else if (task[j].id == num && task[j].date == task[i].date && task[j].state == 'yes') {
                            html +='<li class="task-list-item-line task-list-item-finish">'
                                    + '<span class="task-list-item-dd">' + task[j].name + '</span>'
                                    + '<span class="iconfont icon-check"></span>'
                                    + '<span class="iconfont icon-shanchu"></span>'
                                    + '</li>';
                            c.push(j);
                        }
                    }
                    html += '</ul>';
                    li.innerHTML = html;
                    taskUl.appendChild(li);
                }
            }
            b = false;
        }
    }
}

// 点击删除标志
function tpListDelete(event) {
    var delBox = document.getElementsByClassName('type-delete-wrap')[0];
    var event = event || window.event || arguments.callee.caller.arguments[0];
    delBox.style.display = 'block';
    e = event.target;                                         // 记录点击的删除位置
}

// 取消删除类
function cancelDelTpList() {
    var delBox = document.getElementsByClassName('type-delete-wrap')[0];
    delBox.style.display = 'none';
}

// 确定删除类
function sureDelTpList() {
    var delBox = document.getElementsByClassName('type-delete-wrap')[0];
    var ele = e.parentNode;
    var parent = ele.parentNode;
    var text, id, cId, title, num;               // text：被点击元素的文本  id：被点击文本对应父的id  cId: 子类id  title：被点击文本对应的h4标签  num：父分类旁边的数字

    cateText = JSON.parse(storage.getItem('cate'));
    childCateText = JSON.parse(storage.getItem('childcate'));
    task = JSON.parse(storage.getItem('task'));
    if (ele.nodeName == 'LI') {
        title = parent.previousSibling;
        if (title.nodeName != 'H4') {
            title = title.previousSibling;
        }
        // 获得父id
        for (var i = 0; i < document.getElementsByClassName('type-list-tt').length; i++) {
            if (document.getElementsByClassName('type-list-tt')[i] == title) {
                id = i;
            }
        }
        // 获得子类id
        var name = ele.getElementsByClassName('type-list-item-text')[0].innerHTML;
        for (var i = 0; i < childCateText.length; i++) {
            if (childCateText[i].parent == id && childCateText[i].name == name) {
                cId = childCateText[i].id;
            }
        }
        // 删除子类数据
        text = ele.getElementsByClassName('type-list-item-text')[0].innerHTML;
        for (var i = 0; i < childCateText.length; i++) {
            if (childCateText[i].name === text && childCateText[i].parent == id) {
                childCateText.splice(i, 1);
            }
        }
        // 删除子类相关任务数据
        var len = task.length - 1;
        for (var i = len; i >= 0; i--) {
            if (task[i].id == cId && task[i].parent == id) {
                task.splice(i, 1);
                break;
            }
        }
        cateText[id].child[0] -= 1;
        cateText[id].child[1] -= 1;
        childCate = JSON.stringify(childCateText);
        cate = JSON.stringify(cateText);
        task = JSON.stringify(task);
        storage.setItem("childcate", childCate);
        storage.setItem("cate", cate);
        storage.setItem('task', task);
        parent.removeChild(ele);
        
        num = title.getElementsByClassName('type-list-tt-num')[0];
        num.innerHTML = '(' + (Number(num.innerHTML.charAt(1)) - 1) + ')';
    } else if (ele.nodeName == 'H4') {
        text = ele.getElementsByClassName('type-list-tt-text')[0].innerHTML;
        for (var i = 0; i < cateText.length; i++) {
            if (cateText[i].name === text) {
                cateText.splice(i, 1);
                // 删除对应子类数据
                for (var j = childCateText.length - 1; j >= 0 ; j--) {
                    if (childCateText[j].parent == i) { 
                        childCateText.splice(j, 1);
                    }
                }
                // 删除对应子类任务数据
                for (var j = task.length -1; j >= 0; j--) {
                    if (task[j].parent == i) {
                        task.splice(j, 1);
                    }
                }
                break;
            }
        }
        // 重新排列父类名id
        for (var i = 0; i < cateText.length; i++) {
            cateText[i].id = i;
        }
        cate = JSON.stringify(cateText);
        childCate = JSON.stringify(childCateText);
        task = JSON.stringify(task);
        storage.setItem('cate', cate);
        storage.setItem('childcate', childCate);
        storage.setItem('task', task);
        parent.parentNode.removeChild(parent);
    }
    delBox.style.display = 'none';
    var taskList = document.getElementById('task-list');
    taskList.style.display = 'none';
}

// 打开添加任务分类窗口
function openAddType() {
    var addTpWrap = $('.add-type-wrap');
    var tpAddList = document.getElementById('type-add-list');
    var len = tpAddList.getElementsByTagName('option').length;
    addTpWrap.style.display = 'block';
    // 列表初始化
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            tpAddList.removeChild(tpAddList.lastChild);
        }   
    }
    // 列表添加类名
    cate = JSON.parse(storage.getItem('cate'));
    for (var i = 0; i < cate.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = cate[i].name;
        tpAddList.appendChild(option);
    }
}

// 点击确定按钮
function createNewType() {
    var tpList = $('.type-list');
    var mark = document.getElementsByClassName('type-list-mark').length;
    var tpListTText = tpList.getElementsByClassName('type-list-tt-text');
    var addPType = $('.add-type-ptext');
    var addCType = $('.add-type-ctext');
    var tips = $('.add-type-content-tips');
    var pValue = addPType.value,
        cValue = addCType.value,
        len = tpListTText.length,
        data,                              // 存储当前生成的Li
        r = 0,
        ri = 0;

    tips.style.display = 'none';
    if (!pValue) {                                                            // 父项为空
        tips.innerHTML = '请至少输入/选择父项';
        tips.style.display = 'block';
    } else if (!cValue) {                                                     // 有输入父类名、无子类名
        if (pValue.length > 15) {
            tips.innerHTML = '输入的类名不能超过15个字符';
            tips.style.display = 'block';
        } else {
            for (var i = 0; i < len; i++) {
                if (tpListTText[i].innerHTML === pValue) {
                    tips.style.display = 'block';
                    tips.innerHTML = '已存在该父类，请输入子类名';
                    break;
                }
                r++;                                                   // 如果循环全部顺利执行，则表示没有找到重复的类名
            }
            if (r == len) {                                            // 生成一个父分类列表
                var li = document.createElement('li');
                li.innerHTML = '<h4 class="type-list-tt" onclick="tpListTitleShow(event)">'
                                + '<span class="iconfont icon-folder-open"><\/span>'
                                + '<span class="type-list-tt-text">' + pValue + '</span>'
                                + '<span class="type-list-tt-num">(0)</span>'
                                + '<span class="iconfont icon-shanchu" onclick="tpListDelete(event)"><\/span>'
                                + '</h4>' + '<ul></ul>';
                li.className = 'type-list-mark';
                tpList.appendChild(li);
                // 保存数据到localStorage
                data = {
                    "id": mark,                                       // 存放的位置
                    "name": pValue,
                    "child": [0, 0]
                };
                if (storage.getItem('cate')) {
                    cateText = JSON.parse(storage.getItem('cate'));
                }
                cateText.push(data);
                cate = JSON.stringify(cateText);
                storage.setItem('cate', cate);
                closeAddType();
            }
        }
    } else if (cValue) {                                               // 有输入父项、子项
        if (cValue.length > 15) {
            tips.innerHTML = '输入的类名不能超过15个字符';
            tips.style.display = 'block';
        } else {
            for (var i = 0; i < len; i++) {
                if (tpListTText[i].innerHTML === pValue) {
                    var n = i;
                    break;
                }
                r++;
            }
            if (r == len) {                                            // 父类与子类一起创建（父类名无重复）
                var li = document.createElement('li');
                li.innerHTML = '<h4 class="type-list-tt" onclick="tpListTitleShow(event)">'
                                + '<span class="iconfont icon-folder-open"><\/span>'
                                + '<span class="type-list-tt-text">' + pValue + '</span>'
                                + '<span class="type-list-tt-num">(1)</span>'
                                + '<span class="iconfont icon-shanchu" onclick="tpListDelete(event)"><\/span>'
                                + '</h4>'
                                + '<ul>'
                                + '<li class="type-list-item" onclick="tpListItemShow(event)">'
                                + '<span class="iconfont icon-file-text"></span>'
                                + '<span class="type-list-item-text">' + cValue + '</span>'
                                + '<span class="iconfont icon-shanchu" onclick="tpListDelete(event)"></span>'
                                + '</li></ul>'
                li.className = 'type-list-mark';
                tpList.appendChild(li);
                // 保存数据
                data = {
                    "id": mark,
                    "name": pValue,
                    "child": [1, 1]
                };
                cdata = {
                    "id": 0,
                    "name": cValue,
                    "parent": mark
                };
                if (storage.getItem('cate')) {
                    cateText = JSON.parse(storage.getItem('cate'));
                }
                if (storage.getItem("childcate")) {
                    childCateText = JSON.parse(storage.getItem('childcate'));
                }
                cateText.push(data);
                cate = JSON.stringify(cateText);
                childCateText.push(cdata);
                childCate = JSON.stringify(childCateText);
                storage.setItem('cate', cate);
                storage.setItem('childcate', childCate);

                closeAddType();
            } else {                                                               // 判断父类下的子类是否相同
                var itemNav = tpList.getElementsByClassName('type-list-tt')[n].nextSibling;
                while (itemNav.nodeName != 'UL') {
                    itemNav = itemNav.nextSibling;
                }
                var itemNavTexts = itemNav.getElementsByClassName('type-list-item-text');
                for (var i = 0; i < itemNavTexts.length; i++) {
                    if (itemNavTexts[i].innerHTML === cValue) {
                        tips.innerHTML = '已存在相同的子分类，请重新输入';
                        tips.style.display = 'block';
                        break;
                    }
                    ri++;
                }
                if (ri == itemNavTexts.length) {                                           // 没有重复子类名 创建子类（父类名已存在，单独创建子类）
                    var li = document.createElement('li');
                    var num = tpListTText[n].parentNode.getElementsByClassName('type-list-tt-num')[0];
                    li.className = 'type-list-item'; 
                    li.onclick = tpListItemShow;
                    li.innerHTML = '<span class="iconfont icon-file-text"></span>'
                                    + '<span class="type-list-item-text">' + cValue + '</span>'
                                    + '<span class="iconfont icon-shanchu" onclick="tpListDelete(event)"></span>';
                    cdata = {
                        "id": itemNav.getElementsByClassName('type-list-item').length, 
                        "name": cValue,
                        "parent": n
                    };
                    if (storage.getItem('childcate')) {
                        childCateText = JSON.parse(storage.getItem('childcate'));
                    }
                    childCateText.push(cdata);
                    childCate = JSON.stringify(childCateText);
                    storage.setItem('childcate', childCate);
                    num.innerHTML = '(' + (Number(num.innerHTML.charAt(1)) + 1) + ')';

                    cateText = JSON.parse(storage.getItem('cate'));
                    cateText[n].child[0] += 1;                                          // 获取storage对应的父类数据
                    cateText[n].child[1] += 1;
                    cate = JSON.stringify(cateText);
                    storage.setItem('cate', cate);
                    itemNav.appendChild(li);
                    closeAddType();
                }
            }
        }
    }
}

// 键盘按下   13: 回车  27: ESC
function addTpBoxKDown(event) {
    var event = event || window.event || arguments.callee.caller.arguments[0];
    var keyCode = event.keyCode;
    if (keyCode == 13) {
        createNewType();
    } else if (keyCode == 27) {
        closeAddType();
    }
}

// 关闭添加任务分类窗口
function closeAddType() {
    var addTpWrap = $('.add-type-wrap');
    var addPType = $('.add-type-ptext');
    var addCType = $('.add-type-ctext');
    var tips = $('.add-type-content-tips');
    addPType.value = '';
    addCType.value = '';
    tips.style.display = 'none';
    addTpWrap.style.display = 'none';
}

// 点击任务状态栏
function stateTaskClick(event) {
    var event = event || window.event || arguments.callee.caller.arguments[0];
    var ele = event.target;
    var tStateAll = document.getElementById('task-state-all');
    var tStateNotfinish = document.getElementById('task-state-notfinish');
    var tStateFinish = document.getElementById('task-state-finish');
    var tListNotfinish = document.getElementsByClassName('task-list-notfinish');
    var tListFinish = document.getElementsByClassName('task-list-finish');
    tStateAll.className = '';
    tStateNotfinish.className = '';
    tStateFinish.className = '';
    for (var i = 0; i < tListNotfinish.length; i++) {
        tListNotfinish[i].style.display = 'none';
    }
    for (var i = 0; i < tListFinish.length; i++) {
        tListFinish[i].style.display = 'none';
    }

    if (ele.id == 'task-state-all') {                                                        // 点击所有
        tStateAll.className = 'task-state-focus';
        for (var i = 0; i < tListNotfinish.length; i++) {
            tListNotfinish[i].style.display = 'block';
        }
        for (var i = 0; i < tListFinish.length; i++) {
            tListFinish[i].style.display = 'block';
        }
    } else if (ele.id == 'task-state-notfinish') {                                           // 点击未完成
        tStateNotfinish.className = 'task-state-focus';
        for (var i = 0; i < tListNotfinish.length; i++) {
            tListNotfinish[i].style.display = 'block';
        }
    } else if (ele.id == 'task-state-finish') {                                              // 点击完成
        tStateFinish.className = 'task-state-focus';
        for (var i = 0; i < tListFinish.length; i++) {
            tListFinish[i].style.display = 'block';
        }
    }
}

// 点击任务列表
function tListItemClick(event) {
    // 查看任务详情先关闭任务编辑窗口
    cancleTaskEdit();
    var tpList = document.getElementsByClassName('type-list')[0];
    var tpItem = tpList.getElementsByClassName('type-list-item');
    var event = event || window.event || arguments.callee.caller.arguments[0];
    var cTask = document.getElementById('sidebar-header-content');
    var cDate = document.getElementById('sidebar-date-content');
    var taskContent = document.getElementById('sidebar-content-text');
    var sdbHeader = document.getElementsByClassName('sidebar-header')[0];
    var sdbHDIcon = sdbHeader.getElementsByClassName('iconfont');
    var lis = document.getElementsByClassName('task-list-item-line');
    var ele = event.target;
    var wrap = ele.parentNode;
    var lead, li, name, num, parent, text;

    if (ele.className == 'task-list-item-dd') {                                 // 点击任务字体
        for (var i = 0; i < lis.length; i++) {
            lis[i].id = '';
        }
        li = ele.parentNode;
        li.id = 'task-list-item-focus';

        // 获得被点击任务所属日期
        if (wrap.nodeName != 'UL') {
            wrap = wrap.parentNode;
        }
        lead = wrap.previousSibling;
        if (lead.nodeName != 'H4') {
            lead = lead.previousSibling;
        }
        // 同步右侧任务详情信息
        cTask.innerHTML = ele.innerHTML;
        cDate.innerHTML = lead.innerHTML;
        // 获得task对象位置
        cate = JSON.parse(storage.getItem('cate'));
        childCate = JSON.parse(storage.getItem('childcate'));
        // 获得parent、num
        for (var i = 0; i < tpItem.length; i++) {
            if (tpItem[i].style.backgroundColor) {
                var n = tpItem[i].parentNode.previousElementSibling.getElementsByClassName('type-list-tt-text')[0].innerHTML;
                for (var j = 0; j < cate.length; j++) {
                    if (cate[j].name == n) {
                        parent = cate[j].id;
                        break;
                    }
                }
                n = tpItem[i].getElementsByClassName('type-list-item-text')[0].innerHTML;
                for (var j = 0; j < childCate.length; j++) {
                    if (n == childCate[j].name && parent == childCate[j].parent) {
                        num = childCate[j].id;
                        break;
                    }
                }
                break;
            }
        } 

        name = ele.innerHTML;
        task = JSON.parse(storage.getItem('task'));
        for (var i = 0; i < task.length; i++) {
            if (task[i].id == num && task[i].name == name && task[i].parent == parent) {
                text = task[i].content;
                if (task[i].state == 'no') {
                    sdbHDIcon[0].id = 'bjIcon';
                    sdbHDIcon[1].id = 'wcIcon';
                } else {
                    sdbHDIcon[0].id = '';
                    sdbHDIcon[1].id = '';
                }
            }
        }
        taskContent.innerHTML = text;
    } else if (ele.className == 'iconfont icon-shanchu') {
        // 点击删除按钮
        if (confirm('删除数据无法恢复！！！')) {
            li = ele.parentNode;
            li.parentNode.removeChild(li);
        }
    }
}

// 新建任务内容编辑窗
function openTaskEdit() {
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var sidEdit = sidebar.getElementsByClassName('sidebar-edit');
    var sidShow = sidebar.getElementsByClassName('sidebar-show');
    var editTask = sidebar.getElementsByClassName('edit-tt')[0];
    var editDate = sidebar.getElementsByClassName('edit-date')[0];
    var editContet = document.getElementById('edCont');
    var tpList = document.getElementsByClassName('type-list')[0];
    var lis = tpList.getElementsByTagName('li');
    var li;
    // 重置输入框内容
    editTask.value = '';
    editDate.value = '';
    editContet.value = '';
    // 寻找被点击任务
    for (var i = 0; i < lis.length; i++) {
        if (lis[i].style.backgroundColor) {
            li = lis[i];
            break;
        }
    }
    if (li) {
        // 开启编辑框
        for (var i = 0, len = sidShow.length; i < len; i++) {
            sidShow[i].style.display = 'none';
        }
        // 关闭显示框
        for (var i = 0, len = sidEdit.length; i < len; i++) {
            sidEdit[i].style.display = 'block';
        }
    } else {
        alert('当前没有选中的任务分类');
    }
}

// 任务内容编辑按钮
function taskEdit() {
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var show = sidebar.getElementsByClassName('sidebar-show');
    var edit = sidebar.getElementsByClassName('sidebar-edit');
    var headText = document.getElementById('sidebar-header-content');
    var dateText = document.getElementById('sidebar-date-content');
    var editTask = sidebar.getElementsByClassName('edit-tt')[0];
    var editDate = sidebar.getElementsByClassName('edit-date')[0];
    var editContent = sidebar.getElementsByClassName('edit-content')[0];
    var taskContent = document.getElementById('sidebar-content-text');
    // 开启任务编辑框-----任务标题无法更改
    for (var i = 0; i < show.length; i++) {
        if (i != 0) {
            show[i].style.display = 'none';
        }
    }
    for (var i = 0; i < edit.length; i++) {
        if (i != 0) {
            edit[i].style.display = 'block';
        }
    }

    editTask.value = headText.innerHTML;
    editDate.value = dateText.innerHTML;
    editContent.value = taskContent.innerHTML;
}

// 编辑任务标题（失去焦点）
function editBlur(event) {
    var event = event || window.event || arguments.callee.caller.arguments[0];
    var tips = document.getElementsByClassName('edit-tips');
    var ele = event.target;
    if (ele.className == 'edit-tt') {
        if (!ele.value) {
            tips[0].style.display = 'inline-block';
            tips[0].innerHTML = '请输入任务名';
        } else {
            tips[0].style.display = 'none';
        }
    } else if (ele.className == 'edit-date') {
        if (!ele.value) {
            tips[1].style.display = 'inline-block';
            tips[1].innerHTML = '请输入日期';
        } else {
            tips[1].style.display = 'none';
        }
    }
}

// 取消本次编辑（不保存数据）
function cancleTaskEdit() {
    var sidEdit = document.getElementsByClassName('sidebar-edit');
    var sidShow = document.getElementsByClassName('sidebar-show');
    var editTask = document.getElementsByClassName('edit-tt')[0];
    var editDate = document.getElementsByClassName('edit-date')[0];
    var tips = document.getElementsByClassName('edit-tips');
    for (var i = 0, len = sidShow.length; i < len; i++) {
        sidShow[i].style.display = 'block';
    }
    for (var i = 0, len = sidEdit.length; i < len; i++) {
        sidEdit[i].style.display = 'none';
    }
    // 清除所有编辑残留
    tips[0].style.display = 'none';
    tips[1].style.display = 'none';
    editTask.value = '';
    editDate.value = '';
}

// 提交任务编辑
function submitTaskEdit() {
    var tpList = document.getElementsByClassName('type-list')[0];
    var tpListItem = document.getElementsByClassName('type-list-item');
    var taskList = document.getElementById('task-list');
    var taskTT = document.getElementsByClassName('task-list-tt');
    var taskLine = document.getElementsByClassName('task-list-item-line');
    var inpuTaskName = document.getElementsByClassName('edit-tt')[0].value;
    var date = document.getElementsByClassName('edit-date')[0].value;
    var dateTips = document.getElementsByClassName('edit-tips')[1];
    var editContent = document.getElementsByClassName('edit-content')[0];
    var taskName = document.getElementById('sidebar-header-content').innerHTML;
    var show = document.getElementsByClassName('sidebar-show');
    var edit = document.getElementsByClassName('sidebar-edit');
    var content = editContent.value;
    var name,
        num,
        parent,
        li,
        taskDate,
        taskValue,
        selectTaskLine,
        selectTaskItem;

    // 获得id、parent
    childCate = JSON.parse(storage.getItem('childcate'));
    for (var i = 0; i < tpListItem.length; i++) {
        if (tpListItem[i].style.backgroundColor) {
            nameText = tpListItem[i].getElementsByClassName('type-list-item-text')[0].innerHTML;
            for (var j = 0; j < childCate.length; j++) {
                if (childCate[j].name == nameText) {
                    num = childCate[j].id;
                    parent = childCate[j].parent;
                    break;
                }
            }
            break;
        }
    }
    // 查找选中的任务
    for (var i = 0; i < taskLine.length; i++) {
        if (taskLine[i].id) {
            selectTaskLine = taskLine[i];
        }
    }
    task = JSON.parse(storage.getItem('task'));
    if (task) {
        for (var i = 0; i < task.length; i++) {
            if (task[i].id == num && task[i].name == taskName) {
                taskDate = task[i].date;
                break;
            }
        }
    }
    // 存储数据
    if (show[0].style.display == 'block') {                                   // 编辑
        selectTaskItem = selectTaskLine.parentNode.parentNode;
        name = taskName;
        // 如果更改了日期 重新排列任务列表
        if (taskDate != date) {
            for (var i = 0; i < taskTT.length; i++) {
                if (taskTT[i].innerHTML == date) {                              // 列表中存在已有日期 直接插入
                    var ul = taskTT[i].nextElementSibling;
                    ul.appendChild(selectTaskLine);
                    if (!selectTaskItem.lastChild.lastChild) {
                        taskList.removeChild(selectTaskItem);
                    }
                    // 更新数据
                    for (var i = 0; i < task.length; i++) {
                        if (task[i].id == num && task[i].name == name) {
                            // taskDate = task[i].date;
                            task[i].date = date;
                            task[i].content = content;
                            break;
                        }
                    }
                    task = JSON.stringify(task);
                    storage.setItem('task', task);
                    break;
                } else if (i == (taskTT.length -1) && taskTT[i].innerHTML != date ) {                             // 没有存在日期 新建一行
                    if (selectTaskItem.getElementsByClassName('task-list-item-line').length < 2) {   
                        selectTaskItem.firstChild.innerHTML = date;
                        taskList.appendChild(selectTaskItem);
                    } else {                // 原列表有多个任务项
                        var li = document.createElement('li');
                        li.className = 'task-list-notfinish';
                        li.innerHTML = '<h4 class="task-list-tt">' + date +'</h4>'
                                        + '<ul class="task-list-item">'
                                        + selectTaskLine.outerHTML
                                        + '</ul>'
                        taskList.appendChild(li);
                        selectTaskItem.lastChild.removeChild(selectTaskLine);
                    }
                     // 更新数据
                    for (var i = 0; i < task.length; i++) {
                        if (task[i].id == num && task[i].name == name) {
                            // taskDate = task[i].date;
                            task[i].date = date;
                            task[i].content = content;
                            var taskItem = task[i];
                            task.splice(i, 1);
                            task.push(taskItem);
                            break;
                        }
                    }
                    task = JSON.stringify(task);
                    storage.setItem('task', task);
                }
                // 同步show界面信息
                var showDate = document.getElementById('sidebar-date-content');
                var showContent = document.getElementById('sidebar-content-text');
                showDate.innerHTML = date;
                showContent.innerHTML = content;
            }
        } else {                                                             // 日期无更改
             // 更新数据
             for (var i = 0; i < task.length; i++) {
                if (task[i].id == num && task[i].name == name) {
                    task[i].date = date;
                    task[i].content = content;
                    break;
                }
            }
            task = JSON.stringify(task);
            storage.setItem('task', task);
            var showContent = document.getElementById('sidebar-content-text');
            showContent.innerHTML = content;
        }
    } else if (show[0].style.display == 'none') {                             // 新建
        name = inpuTaskName;
        if (JSON.parse(storage.getItem('task'))) {
            task = JSON.parse(storage.getItem('task'));
        } else {
            task = [];
        }
        if (!name || !date) {
            alert('请先输入任务名\\日期再提交');
        } else {
            var ept = /^\d{4}-(0[1-9]|1[0-2]|[1-9])-([1-9]|[1-3][0-9]|0[1-9])$/g;
            if (ept.test(date)) {
                var li = document.createElement('li');
                if (taskTT.length >= 1) {
                    for (var i = 0; i < task.length; i++) {                           // 生成前先判断列表是否有重复日期
                        if (task[i].date == date) {
                            li.innerHTML = '<li class="task-list-item-line">'
                                            + '<span class="task-list-item-dd">' + name + '</span>'
                                            + '<span class="iconfont icon-check"></span>'
                                            + '<span class="iconfont icon-shanchu"></span>'
                                            + '</li>';
                            taskTT[i].nextElementSibling.appendChild(li);
                            break;
                        } else if (i == (task.length - 1) && task[i].date != date) {
                            li.innerHTML = '<h4 class="task-list-tt">' + date + '</h4>'
                                            + '<ul class="task-list-item">'
                                            + '<li class="task-list-item-line">'
                                            + '<span class="task-list-item-dd">' + name + '</span>'
                                            + '<span class="iconfont icon-check"></span>'
                                            + '<span class="iconfont icon-shanchu"></span>'
                                            + '</li></ul>'
                            taskList.appendChild(li);
                        }
                    }
                } else {
                    li.innerHTML = '<h4 class="task-list-tt">' + date + '</h4>'
                                            + '<ul class="task-list-item">'
                                            + '<li class="task-list-item-line">'
                                            + '<span class="task-list-item-dd">' + name + '</span>'
                                            + '<span class="iconfont icon-check"></span>'
                                            + '<span class="iconfont icon-shanchu"></span>'
                                            + '</li></ul>'
                    taskList.appendChild(li);
                }
                taskValue = {};
                taskValue.id = num;
                taskValue.name = name;
                taskValue.date = date;
                taskValue.state = 'no';
                taskValue.content = content;
                taskValue.parent = parent;
                task.push(taskValue);
                task = JSON.stringify(task);
                storage.setItem('task', task);
            } else {
                dateTips.style.display = 'inline-block';
                dateTips.innerHTML = '请输入正确格式日期';
            }
        }
    }
    // 关闭编辑窗口
    for (var i = 0, len = show.length; i < len; i++) {
        show[i].style.display = 'block';
    }
    for (var i = 0, len = edit.length; i < len; i++) {
        edit[i].style.display = 'none';
    }
}

// 任务完成按钮
function taskFinish() {
    var tpListItem = document.getElementsByClassName('type-list-item');
    var taskLine = document.getElementsByClassName('task-list-item-line');
    var sdbHeader = document.getElementsByClassName('sidebar-header')[0];
    var sdbHDIcon = sdbHeader.getElementsByClassName('iconfont');
    var num,
        parent,
        name,
        nameText;
        cate = JSON.parse(storage.getItem('cate'));
        childCate = JSON.parse(storage.getItem('childcate'));
    // 获得parent
    for (var i = 0; i < tpListItem.length; i++) {
        if (tpListItem[i].style.backgroundColor) {
            var selectTpList = tpListItem[i].parentNode.previousElementSibling;
            nameText = selectTpList.getElementsByClassName('type-list-tt-text')[0].innerHTML;
            for (var j = 0; j < cate.length; j++) {
                if (cate[j].name == nameText) {
                    parent = cate[j].id;
                    break;
                }
            }
            break;
        }
    }
    // 获得id
    for (var i = 0; i < tpListItem.length; i++) {
        if (tpListItem[i].style.backgroundColor) {
            nameText = tpListItem[i].getElementsByClassName('type-list-item-text')[0].innerHTML;
            for (var j = 0; j < childCate.length; j++) {
                if (childCate[j].name == nameText) {
                    num = childCate[j].id;
                    break;
                }
            }
            break;
        }
    }
    task = JSON.parse(storage.getItem('task'));
    // 获得name
    for (var i = 0; i < taskLine.length; i++) {
        if (taskLine[i].id) {
            nameText = taskLine[i].getElementsByClassName('task-list-item-dd')[0].innerHTML;
            for (var j = 0; j < task.length; j++) {
                if (nameText == task[j].name) {
                    name = nameText;
                    break;
                }
            }
            break;
        }
    }
    // 完成样式
    for (var i = 0; i < taskLine.length; i++) {
        nameText = taskLine[i].getElementsByClassName('task-list-item-dd')[0].innerHTML;
        if (nameText == name && taskLine[i].className == 'task-list-item-line') {
            if (confirm('任务完成后将无法编辑！！！')) {
                taskLine[i].className += ' task-list-item-finish';
                sdbHDIcon[0].id = '';
                sdbHDIcon[1].id = '';
                // 同步数据
                for (var j = 0; j < task.length; j++) {
                    if (task[j].id == num && task[j].name == name && task[j].state == 'no' && task[j].parent == parent) {
                        task[j].state = 'yes';
                        break;
                    }
                }
                task = JSON.stringify(task);
                storage.setItem('task', task);
                break;
            }
        }
    }
}