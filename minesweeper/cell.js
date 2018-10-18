/**
* 小方格为正方形
* 其状态有：
* 1. (i, j)为小方格的index
* 2. w 为宽高
* 3. revealed 是否被打开
* 4. bee 是否有雷
*/

function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.x = i * w; // horizontal coordinate
    this.y = j * w; // vertical
    this.revealed = false;
    
    if(Math.random() < 0.5) {
        this.bee = true;
    } else {
        this.bee = false;
    }
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
        }
        fill(200);
        rect(this.x, this.y, this.w, this.w); // draw again remember
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
