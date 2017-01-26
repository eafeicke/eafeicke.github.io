// Grid will be 50 tile by 50 tile board.
// Grid is 5x5 right now for testing.

// Each tile will 5 pixels by 5 pixels.
// 50x50 right now for testing
var tile_size = 50; 

var grid = [
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34]
];

function drawTile(x, y) {
    var c = document.getElementById("slope");
    var ctx = c.getContext("2d");
    //var r = 180 + grid[x][y], g = 130 + grid[x][y], b = 70 + grid[x][y];
    ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
    ctx.fillRect((x*tile_size), (y*tile_size), tile_size, tile_size);
}

for (x = 0; x < 5; x++) {
    for (y = 0; y < 5; y++){
        drawTile(x, y);
    }
}


//var doTheThing = setInterval(rainDrop, 30)

var coordx = 1;
var coordy = 1;

function rainDrop() {
    var c = document.getElementById("slope");
    var ctx = c.getContext("2d");
    ctx.rect(coordx, coordy, 30, 30);
    ctx.stroke();
    coordx += 1;
    coordy += 1;
}