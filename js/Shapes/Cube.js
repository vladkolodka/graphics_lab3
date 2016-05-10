function Cube(point1, point2, height) {
    this.cords = [];
    // ribs
    this.connections = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
    ];

    // get 2D rectangle coordinates
    var cords2d = FlatFigureCreator.rectangle(point1, point2);
    // duplicate cords
    cords2d = cords2d.concat(cords2d);

    var offset = 0;
    // transform to 3D coordinates

    for (var i = 0; i < cords2d.length; i++) {
        this.cords.push([cords2d[i][0], offset, cords2d[i][1]]);
        if (i == 3) offset += height;
    }
}

Cube.prototype = Object.create(Shape.prototype);

Cube.prototype.getMiddleCords = function () {
    return [
        this.cords[0][0] + (this.cords[1][0] - this.cords[0][0]) / 2,
        this.cords[0][1] + (this.cords[4][1] - this.cords[0][1]) / 2,
        this.cords[0][2] + (this.cords[3][2] - this.cords[0][2]) / 2
    ];
};