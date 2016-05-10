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

    // transform to 3D coordinates
    for (var i = 0; i < cords2d.length; i++) {
        if (i == delmer) offset += height;
        this.cords.push([cords2d[i][0], offset, cords2d[i][1]]);
    }

    // create connections
    for (i = 0; i < delmer; i++) {
        if(i + 1 == delmer) break;
        this.connections.push([i, i + 1]);
        this.connections.push([i + delmer, i + delmer + 1]);
        if(i % 10 == 0) this.connections.push([i, i + delmer]);
    }
}

Cylinder.prototype = Object.create(Shape.prototype);

Cylinder.prototype.getMiddleCords = function () {
    return [
        this.cords[270][0] + (this.cords[90][0] - this.cords[270][0]) / 2,
        this.cords[0][1] + (this.cords[361][1] - this.cords[0][1]) / 2,
        this.cords[180][2] + (this.cords[0][2] - this.cords[180][2]) / 2
    ];
};