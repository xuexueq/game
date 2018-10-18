/**
* 小方格为正方形
* 其状态(属性)有：
* 1. (i, j)为小方格的index
* 2. w 为宽高
* 3. revealed 是否被打开
* 4. bee 是否有雷

* 被打开 or 有雷 or 数字
* api:
* show();
* contains();
* reveal();
* countBees();
*/

function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.x = i * w; // horizontal coordinate
    this.y = j * w; // vertical
    this.revealed = true;
    
    if(Math.random() < 0.5) {
        this.bee = true;
    } else {
        this.bee = false;
    }
    this.neighborCount = 0; // the number of neighboring cell's bee
}

Cell.prototype.show = function() {
    stroke(0); // 默认黑色
    noFill(); // 默认不填充 或者填充白色 fill(255)
    rect(this.x, this.y, this.w, this.w); // the single cell is a square
    if(this.revealed) {
        if(this.bee) {
            fill(127); // the bee is black
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5); // draw a circle bee
            return;
        } else { // revealed the cell
            fill(200);
            rect(this.x, this.y, this.w, this.w); // draw again remember
            if(this.neighborCount > 0) {
                textAlign(CENTER); // horizontally centered
                fill(0); // fill first and then draw
                text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w * 0.5);
            }
        }
    }
}

// a single cell clicked by the mouse
Cell.prototype.contains = function(x, y) {
    return (x > this.x && x < this.x + this.w &&
        y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
    this.revealed = true;
}

// when the single cell contains number
Cell.prototype.countBees = function() {
    if(this.bee) {
        return;
    }
    let total = 0;
    for(let ioff = -1; ioff <= 1; ioff++) {
        for(let joff = -1; joff <= 1; joff++) {
            let i = this.i + ioff;
            let j = this.j + joff;
            if(i >= 0 && i < cols && j >=0 && j < rows) { // cols rows grid
                if(grid[i][j].bee) {
                    total++;
                }
            }
        }
    }
    this.neighborCount = total;
}
