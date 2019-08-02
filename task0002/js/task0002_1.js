//1.获取数据
//2.用空格代替特殊符号
//3.给数据进行分组，分组后去重
//4.对数据进行过滤：没有输入数据或限制上限
//5.对输入正确数量的数据进行输出：

function showHobby() {
    var text = $(".hobby-text").value,
        text = text.replace(/[\s,，、;；]+/g, ' ');    //转换特殊分隔符
    var hobby = text.split(" "),    
        hobby = uniqArray(hobby);    //去重

    if (hobby[0] == "") {
        $(".exhibit").innerHTML = "请至少输入一个爱好";
        $(".exhibit").style.color = "#d50000";
    } else if (hobby.length > 10) {
        $(".exhibit").innerHTML = "输入爱好不能超过10个";
        $(".exhibit").style.color = "#d50000";
    } else {
        if ($(".exhibit").childNodes[0]) {
            $(".exhibit").removeChild($(".exhibit").childNodes[0]);
        }
        $(".exhibit").style.color = "#000";
        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        h3.innerHTML = "爱好：";
        div.appendChild(h3);
        for (var i = 0; i < hobby.length; i++) {
            var label = document.createElement("label");
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            label.appendChild(checkbox);
            var data = document.createTextNode(hobby[i] + " ");
            label.appendChild(data);
            div.appendChild(label);
        }
        $(".exhibit").appendChild(div);
    }
}

function reset() {
    $(".hobby-text").value = "";
    if ($(".exhibit").childNodes[0]) {
        $(".exhibit").removeChild($(".exhibit").childNodes[0]);
    }
}