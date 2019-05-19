var canvas;
var ctx;
var running = 0;
var interval;
var cells = [];
var next = [];
var last = [];

window.onload = function(){
    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");
    createGrid();
    
}

function createGrid(){
    cells=[];
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

function setCell(evt){
    let mousePos = getMousePos(evt);
    let x = Math.ceil(mousePos.x/25)-1;
    let y = Math.ceil(mousePos.y/25)-1;    
    fillBoardCell(x,y); 
    if( !contains(cells,{x:x,y:y,status:1}) ) {
        if(!contains(cells,{x:x,y:y,status:0})){
            cells.push({x:x,y:y,status:1});
        }
        else {
            changeCell(cells,{x:x,y:y},1);
        }
    }   
    
    let neighb = setNeighbours(x,y); 
    neighb.forEach(function(item,i,neighb){        
        active = {x:item.x,y:item.y,status:1};        
        if( !contains(cells,item)&&!contains(cells,active) ) {
            cells.push(item);
        }
    })
    //console.log(cells);
    //console.log(neighb);
    let message = "Mouse position: "+x+", "+y;
    //writeMessage(message);
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
    console.log("neighb",neighb);
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
        console.log(cells[i],amount);
    }
}

function startStep(){
    last = cells;
    lifeCycle(cells);

}


function fillBoardCell(x,y){    
    ctx.fillStyle = "#fff";
    ctx.fillRect(x*25,y*25,25,25); 
    ctx.font='20px FontAwesome';
    ctx.fillStyle = "#ff0000";
    ctx.fillText('\uf188',x*25+3,y*25+20);   
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