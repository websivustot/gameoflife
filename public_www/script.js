function createGrid(){    
    clearCanvas();
    ctx.strokeStyle = "#fff";
    for(let i = 0; i < 20; i++){
        let x = i * 25;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 500); 
        ctx.stroke();  
        ctx.beginPath();
        ctx.moveTo(0, x);
        ctx.lineTo(500, x);  
        ctx.stroke();  
    }    
}

function  createCells(){
    let arr = new Array();    
    for(let i = 0; i < 20; i++ ){
        arr[i] = new Array();
        for(let j = 0; j < 20; j++) {
            arr[i][j] = 0;
        }
    }
    return (arr);
}

function setCell(evt){    
    let mousePos = getMousePos(evt);
    let x = Math.ceil(mousePos.x/25)-1;
    let y = Math.ceil(mousePos.y/25)-1;    
     
    if (cells[y][x] == 0) {
        cells[y][x] = 1;
        fillBoardCell(x,y);
    } else {
        cells[y][x] = 0;
        clearBoardCell(x,y);
    } 
    console.log("x,y=",x,y,"check=",checkCell(x,y));


}

function setNext(x,y){    
    if (next[y][x] == 0) {
        fillBoardCell(x,y);
    } else {        
        clearBoardCell(x,y);
    } 
}

function fillBoardCell(x,y){    
    ctx.fillStyle = "#fff";
    ctx.fillRect(x*25,y*25,25,25); 
    ctx.font='20px FontAwesome';
    ctx.fillStyle = "#ff0000";
    ctx.fillText('\uf188',x*25+3,y*25+20);   
}

function clearBoardCell(x,y){    
    ctx.fillStyle = "green";
    ctx.fillRect(x*25+1,y*25+1,23,23);      
}

function startStep(){
    //console.log(cells);
    for(let i = 0; i < 20; i++ ){
        for(let j = 0; j < 20; j++) {
            next[i][j] = checkCell(i,j);
            setNext(i,j);
        }
        
    }
    //console.log(next);
}

function checkCell(x,y){
    //console.log(cells);
    let count = 0;
    let x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6,x7,y7,x8,y8;
    if (x == 0) {
        x1 = 19;
        x4 = 19;
        x6 = 19;
    } else {
        x1 = x - 1;
        x4 = x - 1;
        x6 = x - 1;
    }
    if (y == 0) {
        y1 = 19;
        y2 = 19;
        y3 = 19;
    } else {
        y1 = y - 1;
        y2 = y - 1;
        y3 = y - 1;
    }
    if (x == 19) {
        x3 = 0;
        x5 = 0;
        x8 = 0;
    } else {
        x3 = x + 1;
        x5 = x + 1;
        x8 = x + 1;
    }
    if (y == 19) {
        y6 = 0;
        y7 = 0;
        y8 = 0;
    } else {
        y6 = y + 1;
        y7 = y + 1;
        y8 = y + 1;
    }
    y4 = y;
    y5 = y;
    x2 = x;
    x7 = x;
    console.log(x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6,x7,y7,x8,y8);
    console.log(cells[y1][x1],cells[y2][x2],cells[y3][x3],cells[y4][x4],cells[y5][x5],
        cells[y6][x6],cells[y7][x7],cells[y8][x8]);
    if (cells[y1][x1] == 1) count = count + 1;
    if (cells[y2][x2] == 1) count = count + 1;
    if (cells[y3][x3] == 1) count = count + 1;
    if (cells[y4][x4] == 1) count = count + 1;
    if (cells[y5][x5] == 1) count = count + 1;
    if (cells[y6][x6] == 1) count = count + 1;
    if (cells[y7][x7] == 1) count = count + 1;
    if (cells[y8][x8] == 1) count = count + 1;
    
    if ((count < 2) || (count > 3)) {
        console.log("count false", count);
        return 0;
    } else {
        if (cells[y][x] == 1) {
            console.log("count true", count);
            return 1;
        } else {
            if (count == 3) {
                console.log("count true", count);
                return 1;
            } else {
                console.log("count false", count);
                return 0;
            }
            
        }         
    }
}

var canvas;
var ctx;
var running = 0;
var interval;
var cells = createCells();
var next = cells;

//console.log(cells);

window.onload = function(){
    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");
    createGrid();
    
}





function createRect(){
    let x = 0;
    let y = 0;
    let side = 0;
    let color = "#";
    let colorpicker = "0123456789abcdef";
    x = Math.floor(Math.random()*400+1);
    y = Math.floor(Math.random()*400+1);
    side = Math.floor(Math.random()*80+20);
    for(let i = 0;i<6; i++){
        let temp = Math.floor(Math.random()*16);
        color = color + colorpicker[temp];
    }
    ctx.fillStyle = color;
    ctx.fillRect(x,y,side,side);
}

function startCanvas(){
    if (running){
        running = 0;
        clearInterval(interval);
    } else {
        running = 1;
        interval = setInterval(createRect,200);
    }
}

function clearCanvas() {
    ctx.clearRect(0,0,500,500);

}

function getMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    let tempX = Math.floor(evt.clientX - rect.left);
    let tempY = Math.floor(evt.clientY - rect.top);
    return {
        x:tempX,
        y:tempY
    }
}

function writeMessage(message){
    let mes = document.getElementById("message");
    mes.innerText = message;    
}

function canvasMouseMove(evt){
    let mousePos = getMousePos(evt);
    let message = "Mouse position: "+mousePos.x+", "+mousePos.y;
    writeMessage(message);
}

function getCoordinates(evt){
    let mousePos = getMousePos(evt);
    let x = Math.ceil(mousePos.x/25)-1;
    let y = Math.ceil(mousePos.y/25)-1;
    let message = "Coordinates: "+x+", "+y;
    writeMessage(message);
}



function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++) {        
        if ((arr[i].x === elem.x) && (arr[i].y === elem.y) && (arr[i].status === elem.status)) {            
            return true;
        }
    }
    return false;
}

function changeCell(arr, elem, value) {
    for (var i = 0; i < arr.length; i++) {        
        if ((arr[i].x === elem.x) && (arr[i].y === elem.y)) {            
            arr[i].status = value;
            
        }
    }
    return false;
}

function checkNeighbours (neighb) {
    //console.log("neighb",neighb);
    let amount = 0;
    for(item in neighb){
        if (item.status === 1) {
            amount++;
        }
    }
    return amount;
}

function lifeCycle(cells){
    for(let i = 0; i < cells.length;i++){
        let neighbours = getNeighbours(cells[i].x,cells[i].y);
        let amount = checkNeighbours(neighbours);
        if (amount === 3) {
            changeCell(cells,cells[i],1);
        }
        if (amount !== 2) {            
            changeCell(cells,cells[i],0);
        }
        //console.log(cells[i],amount);
    }
}






function setNeighbours(x,y){
    let neighbours = [];    
    let x1 = (x == 0) ? 19 : x-1;
    let y1 = (y == 0) ? 19 : y-1;    
    neighbours.push({x:x1,y:y1,status:0});
    let x2 = x;
    let y2 = (y == 0) ? 19 : y-1;
    neighbours.push({x:x2,y:y2,status:0});
    let x3 = (x == 19) ? 0 : x+1;
    let y3 = (y == 0) ? 19 : y-1;
    neighbours.push({x:x3,y:y3,status:0});
    let x4 = (x == 0) ? 19 : x-1;
    let y4 = y;
    neighbours.push({x:x4,y:y4,status:0});
    let x5 = (x == 19) ? 0 : x+1;
    let y5 = y;
    neighbours.push({x:x5,y:y5,status:0});
    let x6 = (x == 0) ? 19 : x-1;
    let y6 = (y == 19) ? 0 : y+1;
    neighbours.push({x:x6,y:y6,status:0});
    let x7 = x;    
    let y7 = (y == 19) ? 0 : y+1;
    neighbours.push({x:x7,y:y7,status:0});
    let x8 = (x == 19) ? 0 : x+1;
    let y8 = (y == 19) ? 0 : y+1;
    neighbours.push({x:x8,y:y8,status:0});
    return neighbours;
}

function getNeighbours(x,y){
    let neighbours = [];    
    let x1 = (x == 0) ? 19 : x-1;
    let y1 = (y == 0) ? 19 : y-1;   
    if(contains(cells,{x:x1,y:y1,status:0})) neighbours.push({x:x1,y:y1,status:0});
    if(contains(cells,{x:x1,y:y1,status:1})) neighbours.push({x:x1,y:y1,status:1});
    let x2 = x;
    let y2 = (y == 0) ? 19 : y-1;
    if(contains(cells,{x:x2,y:y2,status:0})) neighbours.push({x:x2,y:y2,status:0});
    if(contains(cells,{x:x2,y:y2,status:1})) neighbours.push({x:x2,y:y2,status:1});
    let x3 = (x == 19) ? 0 : x+1;
    let y3 = (y == 0) ? 19 : y-1;
    if(contains(cells,{x:x3,y:y3,status:0})) neighbours.push({x:x3,y:y3,status:0});
    if(contains(cells,{x:x3,y:y3,status:1})) neighbours.push({x:x3,y:y3,status:1});
    let x4 = (x == 0) ? 19 : x-1;
    let y4 = y;
    if(contains(cells,{x:x4,y:y4,status:0})) neighbours.push({x:x4,y:y4,status:0});
    if(contains(cells,{x:x4,y:y4,status:1})) neighbours.push({x:x4,y:y4,status:1});
    let x5 = (x == 19) ? 0 : x+1;
    let y5 = y;
    if(contains(cells,{x:x5,y:y5,status:0})) neighbours.push({x:x5,y:y5,status:0});
    if(contains(cells,{x:x5,y:y5,status:1})) neighbours.push({x:x5,y:y5,status:1});
    let x6 = (x == 0) ? 19 : x-1;
    let y6 = (y == 19) ? 0 : y+1;
    if(contains(cells,{x:x6,y:y6,status:0})) neighbours.push({x:x6,y:y6,status:0});
    if(contains(cells,{x:x6,y:y6,status:1})) neighbours.push({x:x6,y:y6,status:1});
    let x7 = x;    
    let y7 = (y == 19) ? 0 : y+1;
    if(contains(cells,{x:x7,y:y7,status:0})) neighbours.push({x:x7,y:y7,status:0});
    if(contains(cells,{x:x7,y:y7,status:1})) neighbours.push({x:x7,y:y7,status:1});
    let x8 = (x == 19) ? 0 : x+1;
    let y8 = (y == 19) ? 0 : y+1;
    if(contains(cells,{x:x8,y:y8,status:0})) neighbours.push({x:x8,y:y8,status:0});
    if(contains(cells,{x:x8,y:y8,status:1})) neighbours.push({x:x8,y:y8,status:1});
    return neighbours;
}