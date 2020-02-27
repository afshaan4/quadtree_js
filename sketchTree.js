// le UI has arrived everybody
let qTree

function setup() {
    createCanvas(400, 400);

    let boundary = new Rectangle(200, 200, 200, 200);
    qTree = new QuadTree(boundary, 4);

    for (let i = 0; i < 300; i++) {
        let x = randomGaussian(width / 2, width / 8);
        let y = randomGaussian(height / 2, height / 8);
        let p = new Point(x, y);
        qTree.insert(p);
    }
}

function draw() {
    background(0);
    qTree.show();

    stroke(0, 255, 0);
    rectMode(CENTER);
    let range = new Rectangle(mouseX, mouseY, 30, 30);
    rect(range.x, range.y, range.w * 2, range.h * 2);
    let points = qTree.query(range);
    // jank ass way to do it but bruh
    if (points) for (let p of points) {
        strokeWeight(4);
        point(p.x, p.y);
    }
}