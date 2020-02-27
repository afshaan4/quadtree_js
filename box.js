//  also yoinked from the coding trains video

class Box {
    constructor(x, y, w = 20, h = 20) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.highlight = false;
    }

    // yeet
    intersects(other) {
        return !(other.x - other.w > this.x + this.w
            || other.x + other.w < this.x - this.w
            || other.y - other.h > this.y + this.h
            || other.y + other.h < this.y - this.h);
    }

    setHighlight(value) {
        this.highlight = value;
    }

    move() {
        this.x += random(-1, 1);
        this.y += random(-1, 1);
    }

    render() {
        noStroke();
        if (this.highlight) {
            fill(255);
        } else {
            fill(100);
        }
        rect(this.x, this.y, this.w, this.h);
    }
}