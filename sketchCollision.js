// also yoinked from the coding trains videos
let particles = [];

function setup() {
    createCanvas(600, 400);

    for (let i = 0; i < 500; i++) {
        particles[i] = new Particle(random(width), random(height));
    }
}

function draw() {
    background(0);
    //  make a new quad tree every frame
    let boundary = new Rectangle(300, 200, 600, 400); // epic hardcoded
    qTree = new QuadTree(boundary, 10); // number of things per division, tweak for speed

    for (let p of particles) {
        // fill up the fresh tree
        let point = new Point(p.x, p.y, p);
        qTree.insert(point);

        p.move();
        p.render();
        p.setHighlight(false);

        let range = new Circle(p.x, p.y, p.r * 2);
        let points = qTree.query(range);
        for (let point of points) {
            let other = point.userData;
            if (p !== other && p.intersects(other)) {
                // highlight both intersecting balls
                p.setHighlight(true);
                other.setHighlight(true);
            }
        }
    }
    // qTree.show(); // slows down the thing if theres too many subdivisions
}