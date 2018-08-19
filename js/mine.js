  
var line = 6; //行数
var list = 6; //列数
var minesNum = parseInt(list * line * 0.16); //雷数
var mineWidth = 20;//方块大小
var mineBox = document.getElementById('mineBox'); //table外div容器

var minePosition = new Array(minesNum);//雷位置信息，坐标

//初始化雷区信息
var mines = new Array(line);


window.onload =  function doThis() {

    creatTable();
    initMines();
    makeInfo();

    $(function(){
        $("table td").mousedown(function(e){   //在div="id1"区域点击
            var row = $(this).parent().index(); // 行位置
            var col = $(this).index(); // 列位置
            switch(e.which){
                //左击
                case 1:{
                    check(row,col);
                    break;
                }
                //右击
                case 3:{
                    var mineTable = document.getElementById('mine');  //table
                    if(mines[row][col].checkFlag == 0){
                        mines[row][col].checkFlag = 2;
                        mineTable.rows[row].cells[col].style.backgroundImage = "url('images/flag1.png')";
                        mineTable.rows[row].cells[col].style.backgroundSize='19px 19px';
                    }else if(mines[row][col].checkFlag == 2){
                        mines[row][col].checkFlag = 3;
                        mineTable.rows[row].cells[col].style.backgroundImage = "url('images/flag2.png')";
                        mineTable.rows[row].cells[col].style.backgroundSize='19px 19px';
                    }else if(mines[row][col].checkFlag == 3){
                        mines[row][col].checkFlag = 0;
                        mineTable.rows[row].cells[col].style.backgroundImage = "url('images/')";
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
function checkWin(){
    var n = 0;
    for(var i = 0; i < line; i++){
        for(var j = 0; j < list; j++){
            if(mines[i][j].ifMine == 1 && mines[i][j].checkFlag == 2){
                n++;
            }else if(mines[i][j] != 1 && mines[i][j].checkFlag !=1){
                n--;
            }
        }
    }
    console.log(n,minesNum);
    if(n == minesNum){
        var r = confirm("你赢了！是否重新开始？");
        console.log(r);
        if(r){
            //重置
        }
    }
}


//方块点击递归检测
//递归检查周围八个方块
function check(r, c) {
    var mineTable = document.getElementById('mine'); //table
    //踩到雷 
    if (mines[r][c].ifMine) {
        mines[r][c].checkFlag = 1;
        mineTable.rows[r].cells[c].style.backgroundImage = "url('images/redMine.png')";
        mineTable.rows[r].cells[c].style.backgroundSize='16px 16px';
        //遍历显示未清除的块
        for(var i = 0; i < line; i++){
            for(var j = 0; j < list; j++){
                if(mines[i][j].checkFlag != 1){
                    if(mines[i][j].ifMine){
                        mineTable.rows[i].cells[j].style.backgroundImage = "url('images/blackMine.png')";
                        mineTable.rows[i].cells[j].style.backgroundSize='16px 16px';
                    } else if(mines[i][j].aroundMinesNum != 0){
                        printNum(i,j);
                    } else {
                        console.log(i,j);
                        mineTable.rows[i].cells[j].style.backgroundColor = "#9C9C9C";
                    }
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
        mineTable.rows[r].cells[c].style.backgroundColor = "#9C9C9C";
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
function printNum(r,c){
    var mineTable = document.getElementById('mine'); //table
        if(mines[r][c].aroundMinesNum == 1){
            mineTable.rows[r].cells[c].style.backgroundImage = "url('images/num_1.png')";
            mineTable.rows[r].cells[c].style.backgroundSize='16px 16px';
        }
        if(mines[r][c].aroundMinesNum == 2){
            mineTable.rows[r].cells[c].style.backgroundImage = "url('images/num_2.png')";
            mineTable.rows[r].cells[c].style.backgroundSize='16px 16px';
        }
        if(mines[r][c].aroundMinesNum == 3){
            mineTable.rows[r].cells[c].style.backgroundImage = "url('images/num_3.png')";
            mineTable.rows[r].cells[c].style.backgroundSize='16px 16px';
        }
        if(mines[r][c].aroundMinesNum >= 4){
            mineTable.rows[r].cells[c].style.backgroundImage = "url('images/num_4.png')";
            mineTable.rows[r].cells[c].style.backgroundSize='16px 16px';
        }
}

//创建table
function creatTable(){
    var tableWidth = "'" + mineWidth * list + "px'";
    var tableHeight = "'" + mineWidth * line + "px'";

    var table = "<table id='mine' width=" + tableWidth + "height=" + tableHeight + " border=0 cellSpacing='4'>";
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
    for(var i = 0; i < line; i++){
        mines[i] = new Array(list);
        for(var j = 0; j < list; j++){
            mines[i][j] = {
                ifMine:0,     //0 表示此方块没雷 1表示有
                aroundMinesNum:0,  //值为周围8个方块雷数
                checkFlag:0   //0：未点击 1：点击清除 2：插旗 3：标记
            }
        }
    }

    creatPosition();
    for(var i = 0; i < minesNum; i++){
        var x = minePosition[i].x;
        var y = minePosition[i].y;
        // console.log(x,y);
        mines[x][y].ifMine = 1;
    }
}
//产生随机坐标
function creatPosition() {
    for(var i =-0; i < minesNum; i++){
        minePosition[i] = {
            x:0,
            y:0
        }
    }

    var tempPosition = {
        x:0,
        y:0
    };
    for (var i = 0; i < minesNum; i++) {
        tempPosition.x = Math.floor(Math.random() * line);
        tempPosition.y = Math.floor(Math.random() * list);
        if (!checkThis(minePosition,tempPosition,i)) {
            tempPosition.x = Math.floor(Math.random() * line);
            tempPosition.y = Math.floor(Math.random() * list);
            i--;
        } else {
            minePosition[i].x = tempPosition.x;
            minePosition[i].y = tempPosition.y;
        }
    }
    minePosition.sort(compare);//根据x,y坐标排序
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
        if(valy1 < valy2){
            return -1;
        } else if (valy1 > valy2){
            return 1;
        } else{
            return 0;
        }
    }            
} 
//重复检查
function checkThis(m1,m2,p){
    for(var i = 0; i < p; i++){
        if(m1[i].x == m2.x && m1[i].y == m2.y){
            return false;
        }
    }
    return true;
}

//统计 mines 中的 aroundMinesNum 周围雷数
function makeInfo(){
    for(var i = 0; i < line; i++){
        for(var j = 0; j < list; j++){
            if(mines[i][j].ifMine == 0){
                if(i-1 >= 0 && j-1 >= 0)
                    mines[i][j].aroundMinesNum += mines[i-1][j-1].ifMine;
                if(j-1 >= 0)
                    mines[i][j].aroundMinesNum += mines[i][j-1].ifMine;
                if(i-1 >= 0)
                    mines[i][j].aroundMinesNum += mines[i-1][j].ifMine;
                if(i+1 < line && j+1 < list)
                    mines[i][j].aroundMinesNum += mines[i+1][j+1].ifMine;
                if(i+1 < line)
                    mines[i][j].aroundMinesNum += mines[i+1][j].ifMine;
                if(j+1 < list)
                    mines[i][j].aroundMinesNum += mines[i][j+1].ifMine;
                if(i+1 < line && j-1 >= 0)
                    mines[i][j].aroundMinesNum += mines[i+1][j-1].ifMine;
                if(i-1 >= 0 && j+1 < list)
                    mines[i][j].aroundMinesNum += mines[i-1][j+1].ifMine;
            }
        }
    }
}
