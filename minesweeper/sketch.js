let w = 30; // single cell width
let cols;
let rows;
let grid;
let totalBees = 15; // the number of bee in this grid

// init canvas space and variable( the number of single cell)
function setup() {
    createCanvas(401, 401); // 标准盒模型宽高只针对内容，所有需要表格宽高稍微大些，否则最后一行和最后一列的边框无法显示
    // console.log(width);
    noLoop();
    cols = Math.floor(width / w);
    rows = Math.floor(height / w);
    grid = make2DArray(cols, rows);
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            let config = {
                cols: cols,
                rows: rows
            };
            grid[i][j] = new Cell(i, j, w, grid, config); // single cell object (instantiation)
        }
    }

    // pick totalBees spots
    pickBeeSpots(totalBees);

    // and calculate each single cell's neighboring bee
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            grid[i][j].countBees();
        }
    }
}

// start draw
function draw() {
    background(255); // white, black with 0
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            grid[i][j].show(); // draw a single cell
        }
    }
}

function mousePressed() {
    // console.log(mouseX, mouseY);
    for(let i = 0; i < cols; i++) {
        for(j = 0; j < rows; j++) {
            let cell = grid[i][j];
            if(cell.contains(mouseX, mouseY)) {
                cell.reveal(); // revealed the cell

                // enmbed in here
                if(cell.bee) {
                    gameOver();
                }
            }
        }
    }
}

// 只开辟了空间的二维数组
function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for(let i = 0, len = arr.length; i < len; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function pickBeeSpots(num) {
    let options = []; // all cells
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            options.push([i, j]);
        }
    }

    for(let n = 0; n < num; n++) {
        let beeIndex = floor(random(options.length));
        let choice = options[beeIndex];
        let i = choice[0];
        let j = choice[1];
        grid[i][j].bee = true;
        options.splice(beeIndex, 1);
    }
}

function gameOver() {
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            grid[i][j].revealed = true;
        }
    }
}