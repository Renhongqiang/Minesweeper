/*扫雷游戏*/

var line = 9; //行数
var list = 9; //列数
// var minesNum = 1; //雷数
var minesNum = 10; //雷数
// var minesNum = parseInt(list * line * 0.16); //雷数
var mineWidth = 20; //方块大小
var mineBox = document.getElementById('mineBox'); //table外div容器
// var minePosition = new Array(minesNum); //雷位置信息，坐标
// var mines = new Array(line); //二维数组，表示雷区地图信息
var gameFlag = 1; //1表示笑脸游戏进行 0表示哭脸游戏结束
var clickFlag = 0; //0表示未点击 1表示点击 2表示暂停 用于控制计时器的开始结束
var timeNum = 0; //时间 秒

//游戏难度
function gameLevel(f){
    if(f == "1"){
        line = 9;
        list = 9;
        minesNum = 10;
    }
    if(f == "2"){
        line = 16;
        list = 16;
        minesNum = 40;
    }
    if(f == "3"){
        line = 16;
        list = 30;
        minesNum = 99;
    }
    gameStart();
}

window.onload = function doThis() {
    initGame();
    topNumPrint("L", minesNum); //左上角显示雷数

    setInterval(function () {
        if (clickFlag == 1) { //开始
            timeNum++;
            topNumPrint("R", timeNum);
        }
        if (clickFlag == 0) {
            timeNum = 0;
            topNumPrint("R", timeNum);
        }
        if (clickFlag == 2) { //暂停 保留数字
            topNumPrint("R", timeNum);
        }
    }, 1000);
}

//笑脸按钮
function gameStart() {
    clickFlag = 0;
    initGame();
    topNumPrint("L", minesNum); //左上角显示雷数
    document.getElementById("faceBtn").style.backgroundImage = "url('images/goodFace.png')";
}

//显示雷数 左上角显示数字 参数f为左数字/右时间的判断
function topNumPrint(f, num) {
    var n3 = num % 10;
    var n2 = parseInt(num % 100 / 10);
    var n1 = parseInt(num % 1000 / 100);
    document.getElementById("num" + f + "1").style.backgroundImage = "url('images/num/d" + n1 + ".bmp')";
    document.getElementById("num" + f + "2").style.backgroundImage = "url('images/num/d" + n2 + ".bmp')";
    document.getElementById("num" + f + "3").style.backgroundImage = "url('images/num/d" + n3 + ".bmp')";
}

//初始化函数
function initGame() {
    creatTable();
    initMines();
    makeInfo();

    $(function () {
        $("table td").mousedown(function (e) { //在div="id1"区域点击
            var row = $(this).parent().index(); // 行位置
            var col = $(this).index(); // 列位置
            if (clickFlag != 2) {
                clickFlag = 1;
            }
            switch (e.which) {
                //左击
                case 1:
                    {
                        check(row, col);
                        break;
                    }
                    //右击
                case 3:
                    {
                        var mineTable = document.getElementById('mine'); //table
                        if (mines[row][col].checkFlag == 0) {
                            mines[row][col].checkFlag = 2;
                            mineTable.rows[row].cells[col].style.backgroundImage = "url('images/flag1.png')";
                            mineTable.rows[row].cells[col].style.backgroundSize = '20px 20px';
                        } else if (mines[row][col].checkFlag == 2) {
                            mines[row][col].checkFlag = 3;
                            mineTable.rows[row].cells[col].style.backgroundImage = "url('images/flag2.png')";
                            mineTable.rows[row].cells[col].style.backgroundSize = '20px 20px';
                        } else if (mines[row][col].checkFlag == 3) {
                            mines[row][col].checkFlag = 0;
                            mineTable.rows[row].cells[col].style.backgroundImage = "url('images/bg11.png')";
                        }
                        break;
                    }
            }
            checkWin(); //检测是否赢了
            // alert("当前位置：第" + row + "行，第" + col + "列" + e.which )
        });
    });
  

    
}

//检测赢
function checkWin() {
    var n = 0;
    for (var i = 0; i < line; i++) {
        for (var j = 0; j < list; j++) {
            if (mines[i][j].ifMine == 1 && mines[i][j].checkFlag == 2) {
                n++;
            } else if (mines[i][j] != 1 && mines[i][j].checkFlag != 1) {
                n--;
            }
        }
    }
    // console.log(n, minesNum);
    if (n == minesNum) {
        // var r = confirm("你赢了！是否重新开始？");
        // console.log(r);
        // if (r) {
        //     initGame();
        // }
        alert("你赢了！");
        document.getElementById("faceBtn").style.backgroundImage = "url('images/winFace.png')";
    }
}

//方块点击递归检测
//递归检查周围八个方块
function check(r, c) {
    var mineTable = document.getElementById('mine'); //table
    //踩到雷 
    if (mines[r][c].ifMine) {
        clickFlag = 2;
        gameFlag = 0;
        document.getElementById("faceBtn").style.backgroundImage = "url('images/badFace.png')";
        
        if(!mines[r][c].checkFlag){
             mineTable.rows[r].cells[c].style.backgroundImage = "url('images/redMine.png')";
             mineTable.rows[r].cells[c].style.backgroundSize = '20px 20px';
             mines[r][c].checkFlag = 1;
        }
       
        //遍历显示未清除的块
        for (var i = 0; i < line; i++) {
            for (var j = 0; j < list; j++) {
                if (mines[i][j].checkFlag != 1) {
                    if (mines[i][j].checkFlag == 2 && !mines[i][j].ifMine) {
                        mineTable.rows[i].cells[j].style.backgroundImage = "url('images/miss.png')";
                        mineTable.rows[i].cells[j].style.backgroundSize = '20px 20px';
                    }
                    if (mines[i][j].checkFlag == 3 && mines[i][j].ifMine) {
                        mineTable.rows[i].cells[j].style.backgroundImage = "url('images/blackMine.png')";
                        mineTable.rows[i].cells[j].style.backgroundSize = '20px 20px';
                    }
                    if (mines[i][j].ifMine) {
                        mines[i][j].checkFlag = 1;
                        mineTable.rows[i].cells[j].style.backgroundImage = "url('images/blackMine.png')";
                        mineTable.rows[i].cells[j].style.backgroundSize = '20px 20px';
                    }
                    // if (mines[i][j].aroundMinesNum != 0) {
                    //     printNum(i, j);
                    // }
                    mines[i][j].checkFlag = 1;
                }
            }
        }
    }
    //踩到数字块
    else if (mines[r][c].aroundMinesNum > 0 && mines[r][c].checkFlag == 0) {
        mines[r][c].checkFlag = 1;
        printNum(r, c);
    }
    //猜到空白块
    else if (mines[r][c].checkFlag == 0) {
        mines[r][c].checkFlag = 1;
        // mineTable.rows[r].cells[c].style.backgroundColor = "#9C9C9C";
        mineTable.rows[r].cells[c].style.backgroundImage = "url('images/bg22.png')";
        mineTable.rows[r].cells[c].style.backgroundSize = '20px 20px';
        if (r - 1 >= 0 && c - 1 >= 0) {
            check(r - 1, c - 1);
        }
        if (c - 1 >= 0) {
            check(r, c - 1);
        }
        if (r - 1 >= 0) {
            check(r - 1, c);
        }
        if (r + 1 < line && c + 1 < list) {
            check(r + 1, c + 1);
        }
        if (r + 1 < line) {
            check(r + 1, c);
        }
        if (c + 1 < list) {
            check(r, c + 1);
        }
        if (r + 1 < line && c - 1 >= 0) {
            check(r + 1, c - 1);
        }
        if (r - 1 >= 0 && c + 1 < list) {
            check(r - 1, c + 1);
        }
    } else {
        return 0;
    }
}
//显示r行c列方块的数字
function printNum(r, c) {
    var mineTable = document.getElementById('mine'); //table
    if (mines[r][c].aroundMinesNum == 1) {
        mineTable.rows[r].cells[c].style.backgroundImage = "url('images/num_1.png')";
        mineTable.rows[r].cells[c].style.backgroundSize = '20px 20px';
    }
    if (mines[r][c].aroundMinesNum == 2) {
        mineTable.rows[r].cells[c].style.backgroundImage = "url('images/num_2.png')";
        mineTable.rows[r].cells[c].style.backgroundSize = '20px 20px';
    }
    if (mines[r][c].aroundMinesNum == 3) {
        mineTable.rows[r].cells[c].style.backgroundImage = "url('images/num_3.png')";
        mineTable.rows[r].cells[c].style.backgroundSize = '20px 20px';
    }
    if (mines[r][c].aroundMinesNum == 4) {
        mineTable.rows[r].cells[c].style.backgroundImage = "url('images/num_4.png')";
        mineTable.rows[r].cells[c].style.backgroundSize = '20px 20px';
    }
    if (mines[r][c].aroundMinesNum == 5) {
        mineTable.rows[r].cells[c].style.backgroundImage = "url('images/num_5.png')";
        mineTable.rows[r].cells[c].style.backgroundSize = '20px 20px';
    }
    if (mines[r][c].aroundMinesNum == 6) {
        mineTable.rows[r].cells[c].style.backgroundImage = "url('images/num_6.png')";
        mineTable.rows[r].cells[c].style.backgroundSize = '20px 20px';
    }
    if (mines[r][c].aroundMinesNum == 7) {
        mineTable.rows[r].cells[c].style.backgroundImage = "url('images/num_7.png')";
        mineTable.rows[r].cells[c].style.backgroundSize = '20px 20px';
    }
    if (mines[r][c].aroundMinesNum == 8) {
        mineTable.rows[r].cells[c].style.backgroundImage = "url('images/num_8.png')";
        mineTable.rows[r].cells[c].style.backgroundSize = '20px 20px';
    }
}

//创建table
function creatTable() {
    var tableWidth = "'" + mineWidth * list + "px'";
    var tableHeight = "'" + mineWidth * line + "px'";

    var table = "<table id='mine' width=" + tableWidth + "height=" + tableHeight + " border=0 cellSpacing='0'>";
    for (var i = 1; i <= line; i++) {
        table += "<tr>";
        for (var j = 1; j <= list; j++) {
            table += "<td></td>";
        }
        table += "</tr>";
    }
    mineBox.innerHTML = table;
    mineBox.style.width = mineWidth * list + 10 + "px";
    mineBox.style.height = mineWidth * line + 10 + "px";
    document.getElementById('bgBox').style.width = mineWidth * list + 35 + "px";
    document.getElementById('bgBox').style.height = mineWidth * line + 110 + "px";

    document.getElementById('boderBox').style.width = mineWidth * list + 60 + "px";
    document.getElementById('menuTwo').style.width = mineWidth * list + 35 + "px";
    document.getElementById('boderBox').style.height = mineWidth * line + 190 + "px";

    document.getElementById('topBox').style.width = mineWidth * list + 10 + "px";
    document.getElementById('topBoxBg').style.width = mineWidth * list + 2 + "px";
    document.getElementById('faceBtn').style.marginLeft = mineWidth * list * 0.5 - 15 + "px";

}

//产生雷,初始化数组信息
function initMines() {
    mines = new Array(24); //全局变量雷信息
    for (var i = 0; i < 24; i++) {
        mines[i] = new Array(30);
        for (var j = 0; j < 30; j++) {
            mines[i][j] = {
                ifMine: 0, //0 表示此方块没雷 1表示有
                aroundMinesNum: 0, //值为周围8个方块雷数
                checkFlag: 0 //0：未点击 1：点击清除 2：插旗 3：标记
            }
        }
    }
    minePosition = new Array(minesNum); //定义全局变量
    creatPosition();
    for (var i = 0; i < minesNum; i++) {
        var x = minePosition[i].x;
        var y = minePosition[i].y;
        // console.log(x,y);
        mines[x][y].ifMine = 1;
    }
    // console.log(mines);
    // console.log(minePosition);
}
//产生随机坐标
function creatPosition() {
    for (var i = -0; i < minesNum; i++) {
        minePosition[i] = {
            x: 0,
            y: 0
        }
    }

    var tempPosition = {
        x: 0,
        y: 0
    };
    for (var i = 0; i < minesNum; i++) {
        tempPosition.x = Math.floor(Math.random() * line);
        tempPosition.y = Math.floor(Math.random() * list);
        if (!checkThis(minePosition, tempPosition, i)) {
            tempPosition.x = Math.floor(Math.random() * line);
            tempPosition.y = Math.floor(Math.random() * list);
            i--;
        } else {
            minePosition[i].x = tempPosition.x;
            minePosition[i].y = tempPosition.y;
        }
    }
    minePosition.sort(compare); //根据x,y坐标排序
}
//排序比较参数
var compare = function (obj1, obj2) {
    var valx1 = obj1.x;
    var valx2 = obj2.x;
    var valy1 = obj1.y;
    var valy2 = obj2.y;
    if (valx1 < valx2) {
        return -1;
    } else if (valx1 > valx2) {
        return 1;
    } else {
        if (valy1 < valy2) {
            return -1;
        } else if (valy1 > valy2) {
            return 1;
        } else {
            return 0;
        }
    }
}
//重复检查
function checkThis(m1, m2, p) {
    for (var i = 0; i < p; i++) {
        if (m1[i].x == m2.x && m1[i].y == m2.y) {
            return false;
        }
    }
    return true;
}

//统计 mines 中的 aroundMinesNum 周围雷数
function makeInfo() {
    for (var i = 0; i < line; i++) {
        for (var j = 0; j < list; j++) {
            if (mines[i][j].ifMine == 0) {
                if (i - 1 >= 0 && j - 1 >= 0)
                    mines[i][j].aroundMinesNum += mines[i - 1][j - 1].ifMine;
                if (j - 1 >= 0)
                    mines[i][j].aroundMinesNum += mines[i][j - 1].ifMine;
                if (i - 1 >= 0)
                    mines[i][j].aroundMinesNum += mines[i - 1][j].ifMine;
                if (i + 1 < line && j + 1 < list)
                    mines[i][j].aroundMinesNum += mines[i + 1][j + 1].ifMine;
                if (i + 1 < line)
                    mines[i][j].aroundMinesNum += mines[i + 1][j].ifMine;
                if (j + 1 < list)
                    mines[i][j].aroundMinesNum += mines[i][j + 1].ifMine;
                if (i + 1 < line && j - 1 >= 0)
                    mines[i][j].aroundMinesNum += mines[i + 1][j - 1].ifMine;
                if (i - 1 >= 0 && j + 1 < list)
                    mines[i][j].aroundMinesNum += mines[i - 1][j + 1].ifMine;
            }
        }
    }
}

//不同时显示
var winMenuG = 0;
var winMenuH = 0;
//菜单按钮
function menuGame(){
    if(!winMenuG){
        $("#winGame").show(10); 
        winMenuG = 1;
        $("#winHelp").hide(10); 
        winMenuH = 0;
    } else{
        $("#winGame").hide(10); 
        winMenuG = 0;
    }  
}
function menuHelp(){
        if(!winMenuH){
            $("#winHelp").show(10); 
            winMenuH = 1;
            $("#winGame").hide(10); 
        winMenuG = 0;
        } else{
            $("#winHelp").hide(10); 
            winMenuH = 0;
        } 
}

