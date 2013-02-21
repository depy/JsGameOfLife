var pixelSize = 4;
var numCells = 100;
var canvas = document.getElementById('background');
canvas.width = pixelSize*numCells;
canvas.height = pixelSize*numCells;
var context = canvas.getContext('2d');
var arr = [];

for(var i = 0; i<numCells; i++) {
    var innerArr = [];
    for(var j = 0; j<numCells; j++) {
        innerArr.push(0);
    }
    arr.push(innerArr);   
}

function display(arr) {
    for(var x = 0; x < arr.length; x++) {
        for(var y = 0; y < arr[x].length; y++) {
            drawCell(x,y,arr[x][y]);
        }
    }
}

function drawCell(x,y,alive) {
    context.beginPath();
    context.rect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
    context.fillStyle = alive ? 'black' : '#EEE';
    context.fill();     
}

function randomlyPopulate(arr) {
    for(var i = 0; i < numCells*5; i++) {
        var x = parseInt(Math.random()*numCells);
        var y = parseInt(Math.random()*numCells);
        arr[x][y]=1;
    }
}

function aliveNeighbors(x, y) {
    if(x > 0 && y > 0 && x < numCells-1 && y < numCells-1) {
         var totalAlive = 
             arr[x-1][y-1]+
             arr[x][y-1]+
             arr[x+1][y-1]+
             arr[x-1][y]+
             arr[x+1][y]+
             arr[x-1][y+1]+
             arr[x][y+1]+
             arr[x+1][y+1];
        return totalAlive;
    } else {
         return 0;   
    }
}

function step() {
    for(var x = 0; x < arr.length; x++) {
        for(var y = 0; y < arr[x].length; y++) {
            var cell = arr[x][y];
            var alives = aliveNeighbors(x,y);
            
            if(alives < 2) {
                arr[x][y] = 0;
            }
            if(alives > 3) {
                arr[x][y] = 0;   
            }
            if(cell == 0 && alives == 3) {
                arr[x][y] = 1;
            }
        }
    }        
}    

randomlyPopulate(arr);
display(arr);

setInterval(function() {
    step();
    display(arr);
}, 100); 
