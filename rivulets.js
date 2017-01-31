// var doTheThing = setInterval(rainDrop, 30)
//[[50,50,50,50,50],
// [50,50,50,50,50],
// [50,50,50,50,50],
// [50,50,50,50,50],
// [50,50,50,50,50]]

// It might make more sense to define the number of pixels in a tile 
// and the number of tiles in a grid and calculate theh screen size from there

class Slope {
    constructor(gridSize = 5, 
                maxResistance = 50, 
                rainDelta = 1,
                screenSize = 100,
                modWest = 0,
                modSouthwest = 0,
                modSouth = 0,
                modSoutheast = 0,
                modEast = 0,
                beginColor = [180, 130, 70]) {
        
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
    }
    
    makeGrid() {
        var grid = [];
        for (var i = 0; i < this.gridSize; i++) {
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
        for (var row = 0; row < this.gridSize; row++) {
            for (var col = 0; col < this.gridSize; col++) {
                this.drawTile(row, col);
            }
        }
    }
    
    pickStart() {
        return Math.random(0, self.gridSize);
    }
    
    updateSlope(row, col) {
        this.grid[row][col] += this.rainDelta;
    }
    
    getNeighbors(row, col) {
        
    }
    
    createSelection(neighbors) {
        
    }
    
    pickNext(row, col) {
        var neighbors = this.getNeighbors(row, col);
        var selectionArray = this.createSelection(neighbors);
        return random.choice(selectionArray);
    }
    
    rainDrop() {
        var row = 0;
        var col = this.pickStart();
        
        while (row < this.gridSize) {
            this.updateSlope(row, col);
            this.drawTile(row, col);
            row, col = this.pickNext(row, col);
        }
    }
}

var testSlope = new Slope();
