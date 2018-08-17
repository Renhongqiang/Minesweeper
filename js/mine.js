   
var line = 16; //行数
var list = 30; //列数
var minesNum = list * line * 0.15; //雷数
var mineWidth = 20;//方块大小
var mineBox = document.getElementById('mineBox'); //table外div容器

//初始化雷区信息
var mines = new Array(line);
for(var i = 0; i < line; i++){
    mines[i] = new Array(list);
    for(var j = 0; j < list; j++){
        mines[i][j] = {
            ifmine:0,     //0 表示此方块没雷 1表示有
            aroundNum:0,  //值为周围8个方块雷数
            checkFlag:0   //0：未点击 1：点击清除 2：插旗 3：标记
        }
    }
}

window.onload =  function doThis() {

    creatTable();
    initMines();

    $(function(){
    $("table td").click(function() {
        var row = $(this).parent().index() + 1; // 行位置
        var col = $(this).index() + 1; // 列位置
        alert("当前位置：第" + row + "行，第" + col + "列")

    });
    });
}

//创建table
function creatTable(){
    var tableWidth = "'" + mineWidth * list + "px'";
    var tableHeight = "'" + mineWidth * line + "px'";

    var table = "<table id='mine' width=" + tableWidth + "height=" + tableHeight + " border=1 cellspacing='0'>";
    for (var i = 1; i <= line; i++) {
        table += "<tr>";
        for (var j = 1; j <= list; j++) {
            table += "<td></td>";
        }
        table += "</tr>";
    }   
    mineBox.innerHTML = table;
    mineBox.style.width = mineWidth * list + 20 +"px";
    mineBox.style.height = mineWidth * line + 20 + "px";
}

//产生雷,初始化数组信息
function initMines(){
    
}

function creatNum(n) {
    var arr = [];

    for (var i = 0; i < n; i++) {
        var one = Math.floor(Math.random() * 30 + 2);
        if (arr.indexOf(one) > -1) {
            one = Math.floor(Math.random() * 30 + 2);
            i--;
        } else {
            arr.push(one);
        }
    }
    return arr;
}

