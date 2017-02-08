//[[50,50,50,50,50],
// [50,50,50,50,50],
// [50,50,50,50,50],
// [50,50,50,50,50],
// [50,50,50,50,50]]

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function chooseRandFromArray(inArray) {
    return inArray[getRandomInt(0, inArray.length)];
}

// It might make more sense to define the number of pixels in a tile 
// and the number of tiles in a grid and calculate theh screen size from there

class Slope {
    constructor(gridSize = 5, 
                maxResistance = 50, 
                rainDelta = 10,
                screenSize = 100,
                modWest = 0,
                modSouthwest = 0,
                modSouth = 0,
                modSoutheast = 0,
                modEast = 0,
                beginColor = [190, 160, 100]) {
        
        this.gridSize = gridSize; // number of rows and columns on the board (board is always square, so rows==cols)
        this.maxResistance = maxResistance;
        this.rainDelta = rainDelta;
        this.screenSize = screenSize;
        this.modWest = modWest;
        this.modSouthwest = modSouthwest;
        this.modSouth = modSouth;
        this.modSoutheast = modSoutheast;
        this.modEast = modEast;
        this.beginColor = beginColor;
        
        this.tileSize = this.screenSize / this.gridSize; // Number of pixels in a tile is size of screen divided by number of tiles in grid
        
        this.grid = this.makeGrid();
        this.drawBoard();
        
        // The current row and current column
        // initialize to greater than the grid size so it hits the first case in rainDrop
        this.row = this.gridSize + 1;
        this.col = this.pickStart();
    }
    
    makeGrid() {
        var grid = [];
        for (var i = 0; i < this.gridSize + 1; i++) {
            var line = [];
            for (var j = 0; j < this.gridSize; j++) {
                line.push(this.maxResistance);
            }
            grid.push(line);
        }
        return grid;
    }
    
    drawTile(row, col) {
        var tileVal = this.grid[row][col];
        
        var c = document.getElementById("slope");
        var ctx = c.getContext("2d");
        var r = this.beginColor[0] - tileVal, g = this.beginColor[1] - tileVal, b = this.beginColor[2] - tileVal;
        ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
        ctx.fillRect((col*this.tileSize), (row*this.tileSize), this.tileSize, this.tileSize);
    }
    
    drawBoard() {
        for (var dbRow = 0; dbRow < this.gridSize; dbRow++) {
            for (var dbCol = 0; dbCol < this.gridSize; dbCol++) {
                this.drawTile(dbRow, dbCol);
            }
        }
    }
    
    pickStart() {
        return getRandomInt(0, this.gridSize);
    }
    
    updateSlope() {
        this.grid[this.row][this.col] += this.rainDelta;
    }
    
    inRange(row, col) {
        return ((0 <= row) &&
                (row < this.gridSize + 1) && 
                (0 <= col) &&
                (col < this.gridSize));
    }
    
    coordToStr(row, col) {
        return row + "," + col;
    }
    
    strToCoord(coordStr) {
        return coordStr.split(",");
    }
    
    getNeighbors() {
        var neighbors = new Map();
        // west
        var w_row = this.row, w_col = this.col - 1;
        if (this.inRange(w_row, w_col)) {
            neighbors.set(this.coordToStr(w_row, w_col), this.grid[w_row][w_col]);
        }
        // southwest
        var sw_row = this.row + 1, sw_col = this.col - 1;
        if (this.inRange(sw_row, sw_col)) {
            neighbors.set(this.coordToStr(sw_row, sw_col), this.grid[sw_row][sw_col]);
        }
        // south
        var s_row = this.row + 1, s_col = this.col;
        if (this.inRange(s_row, s_col)) {
            neighbors.set(this.coordToStr(s_row, s_col), this.grid[s_row][s_col]);
        }
        // southeast
        var se_row = this.row + 1, se_col = this.col + 1;
        if (this.inRange(se_row, se_col)) {
            neighbors.set(this.coordToStr(se_row, se_col), this.grid[se_row][se_col]);
        }
        // east
        var e_row = this.row, e_col = this.col + 1;
        if (this.inRange(e_row, e_col)) {
            neighbors.set(this.coordToStr(e_row, e_col), this.grid[e_row][e_col]);
        }
        return neighbors;
    }
    
    createSelection(neighbors) {
        var selectionArray = [];
        for (var [coord, weight] of neighbors) {
            for (var i = 0; i < weight; i++) {
                selectionArray.push(coord);
            }
        }
        return selectionArray;
    }
    
    pickNext() {
        if (this.row >= this.gridSize) {
            this.row = 0;
            this.col = this.pickStart();
        }
        else {
            var neighbors = this.getNeighbors();
            var selectionArray = this.createSelection(neighbors);
            var nextString = chooseRandFromArray(selectionArray);
            var nextCoord = this.strToCoord(nextString);
            this.row = parseInt(nextCoord[0]);
            this.col = parseInt(nextCoord[1]);
        }
    }
    
    rainDrop() {
        this.pickNext();
        this.updateSlope();
        this.drawTile(this.row, this.col);
    }
}

var testSlope = new Slope();

setInterval(function(){testSlope.rainDrop();}, 500);

// TODO: Start drop at top row
// TODO: Add hidden bottom row to allow drop to finish
// TODO: Make board bigger, tiles smaller


