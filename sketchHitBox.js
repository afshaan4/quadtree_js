// also yoinked from the coding trains videos
let boxes = [];
let boundary;

// draw the divisions
function showTree(tree) {
    stroke(255);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(tree.boundary.x, tree.boundary.y, tree.boundary.w * 2, tree.boundary.h * 2);
    if (tree.divided) {
        showTree(tree.northeast);
        showTree(tree.northwest);
        showTree(tree.southeast);
        showTree(tree.southwest);
    }
}

function setup() {
    createCanvas(600, 400);
    boundary = new Rectangle(300, 200, 600, 400); // epic hardcoded

    for (let i = 0; i < 50; i++) {
        boxes[i] = new Box(random(width), random(height));
    }
}

function draw() {
    background(0);
    // make new tree
    qTree = new QuadTree(boundary, 4); // number of things per division, tweak for speed

    for (let b of boxes) {
        // fill new tree
        let box = new Rectangle(b.x, b.y, b.w, b.h, b);
        qTree.insert(box);

        b.move();
        b.render();
        b.setHighlight(false);

        let range = new Rectangle(b.x, b.y, b.w * 2, b.h * 2);
        let rects = qTree.query(range);
        for (let r of rects) {
            let other = r.userData;
            if (b !== other && b.intersects(other)) {
                // highlight both intersecting balls
                b.setHighlight(true);
                other.setHighlight(true);
            }
        }
    }
    showTree(qTree); // slows down the thing if theres too many subdivisions
}