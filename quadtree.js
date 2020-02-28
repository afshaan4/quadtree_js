// epicly yoinked from the coding trains videos


////////////////////////////////////////////////////////////////////////////////
// helper stuff
////////////////////////////////////////////////////////////////////////////////

// rectangles have their x, y in the center.
class Rectangle {
    constructor(x, y, w, h, userData) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.userData = userData;
    }

    // checks if there is a rectangle inside
    contains(box) {
        return (box.x - box.w >= this.x - this.w
            && box.x + box.w <= this.x + this.w
            && box.y - box.h >= this.y - this.h
            && box.y + box.h <= this.y + this.h);
    }

    // yeet
    intersects(range) {
        return !(range.x - range.w > this.x + this.w
            || range.x + range.w < this.x - this.w
            || range.y - range.h > this.y + this.h
            || range.y + range.h < this.y - this.h);
    }
}


////////////////////////////////////////////////////////////////////////////////
// The actual quadtree
////////////////////////////////////////////////////////////////////////////////

class QuadTree {
    constructor(boundary, n) {
        this.boundary = boundary;
        this.capacity = n;
        this.boxes = [];
        this.divided = false;
    }

    // divide the current cell into 4 new cells
    // north south east west used to differentiate tiles
    subDivide() {
        // oof size: LARGE
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
        let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
        let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
        let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);

        this.northeast = new QuadTree(ne, this.capacity);
        this.northwest = new QuadTree(nw, this.capacity);
        this.southeast = new QuadTree(se, this.capacity);
        this.southwest = new QuadTree(sw, this.capacity);
        this.divided = true;
    }

    insert(box) {
        // if the box isnt in this quadrant do nothing
        if (!this.boundary.contains(box)) return false;

        if ((this.boxes.length < this.capacity) && this.northeast == null) {
            this.boxes.push(box);
            return true;
        } else {
            if (!this.divided) {
                this.subDivide();
            }
            if (this.northeast.insert(box)) return true;
            else if (this.northwest.insert(box)) return true;
            else if (this.southeast.insert(box)) return true
            else if (this.southwest.insert(box)) return true
        }
    }

    // find all boxes in a rectangular area(range)
    query(range, found) {
        if (!found) found = [];

        if (!this.boundary.intersects(range)) {
            return;
        } else {
            for (let b of this.boxes) {
                if (range.contains(b)) {
                    found.push(b);
                }
            }
            if (this.divided) {
                this.northeast.query(range, found);
                this.northwest.query(range, found);
                this.southeast.query(range, found);
                this.southwest.query(range, found);
            }
            return found;
        }
    }
}