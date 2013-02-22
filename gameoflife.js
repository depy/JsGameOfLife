var pixelSize = 4;
var numCells = 160;
var canvas = document.getElementById('background');
canvas.width = pixelSize*numCells;
canvas.height = pixelSize*numCells;
var context = canvas.getContext('2d');
var arr = buildArr();

function buildArr() {
        var arr = [];
        for(var i = 0; i<numCells; i++) {
                var innerArr = [];
                for(var j = 0; j<numCells; j++) {
                        innerArr[j] = 0;
                }
                arr[i] = innerArr;
        }
        return arr;
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
        for(var x = 0; x < arr.length; x++) {
                for(y = 0; y < arr[x].length; y++) {
                        if(Math.log(Math.random()*10) < -0.6) {
                                arr[x][y]=1;
                        }
                }
        }
}

function manualSetup(arr) {
    arr[50][70] = 1;   
    arr[51][70] = 1;   
    arr[52][70] = 1;   
    arr[53][70] = 1;   
    arr[54][70] = 1;   
    arr[55][70] = 1;   
    arr[56][70] = 1;   
    arr[57][70] = 1;
   
    arr[59][70] = 1;
    arr[60][70] = 1;
    arr[61][70] = 1;
    arr[62][70] = 1;
    arr[63][70] = 1;
    
    arr[67][70] = 1;
    arr[68][70] = 1;
    arr[69][70] = 1;
    
    arr[76][70] = 1;
    arr[77][70] = 1;
    arr[78][70] = 1;
    arr[79][70] = 1;
    arr[80][70] = 1;
    arr[81][70] = 1;
    arr[82][70] = 1;
    
    arr[84][70] = 1;
    arr[85][70] = 1;
    arr[86][70] = 1;
    arr[87][70] = 1;
    arr[88][70] = 1;
       
}

function aliveNeighbors(arr, x, y) {
        if(x > 0 && y > 0 && x < numCells-1 && y < numCells-1) {
                var totalAlive = 
                        arr[x-1][y-1]+
                        arr[x][y-1]+
                        arr[x+1][y-1]+
                        arr[x-1][y]+
                        //arr[x][y]+
                        arr[x+1][y]+
                        arr[x-1][y+1]+
                        arr[x][y+1]+
                        arr[x+1][y+1];
                return totalAlive;
        } else {
                return 0;
        }
}

function step(arr) {
        var newArr = buildArr();
        for(var x = 0; x < arr.length; x++) {
                for(var y = 0; y < arr[x].length; y++) {
                        var cell = arr[x][y];
                        var alives = aliveNeighbors(arr, x,y);

                        if(cell == 1) {
                                if(alives < 2) {
                                        newArr[x][y] = 0;
                                } else if(alives == 2 || alives == 3) {
                                        newArr[x][y] = 1;
                                } else if(alives > 3) {
                                        newArr[x][y] = 0;
                                }
                        } else if(cell == 0 && alives == 3) {
                                newArr[x][y] = 1;
                        }
                }
        }
        delete arr
	arr = null;
        return newArr;
}

//randomlyPopulate(arr);
manualSetup(arr);
display(arr);

var startButton = document.getElementById("start");
    startButton.onclick = function() { 
        setInterval(function() {
                    var newArr = step(arr);
                    display(newArr);
                    arr = newArr;
    }, 50);
        
};



