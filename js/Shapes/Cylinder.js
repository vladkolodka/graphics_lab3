function Cylinder(x, y, radius, height) {
    this.cords = [];
    // ribs
    this.connections = [];

    // get 2D rectangle coordinates
    var cords2d = FlatFigureCreator.circle(x, y, radius);
    var delmer = cords2d.length;

    // duplicate cords
    cords2d = cords2d.concat(cords2d);

    var offset = 0;

    this.x = x - radius;
    this.y = offset;
    this.z = y - radius;

    // transform to 3D coordinates
    for (var i = 0; i < cords2d.length; i++) {
        if (i == delmer) offset += height;
        this.cords.push([cords2d[i][0], offset, cords2d[i][1]]);
    }

    this.halfX = radius;
    this.halfY = height / 2;
    this.halfZ = radius;

    // create connections
    for (i = 0; i < delmer; i++) {
        if(i + 1 == delmer) break;
        this.connections.push([i, i + 1]);
        this.connections.push([i + delmer, i + delmer + 1]);
        this.connections.push([i, i + delmer]);
    }
}

Cylinder.prototype = Object.create(Shape.prototype);