function Pyramid(point1, point2, height){
    this.cords = [];
    // ribs

    this.connections = [
        [1, 2], [2, 3], [3, 4], [4, 1],
        [1, 0], [2, 0], [3, 0], [4, 0]
    ];

    // get 2D rectangle coordinates
    var cords2d = FlatFigureCreator.rectangle(point1, point2);
    
    var offset = 0;
    this.cords.push([point1[0] + (point2[0] - point1[0]) / 2, offset, point1[1] + (point2[1] - point1[1]) / 2]);

    offset += height;
    // transform to 3D coordinates
    for (var i = 0; i < cords2d.length; i++) this.cords.push([cords2d[i][0], offset, cords2d[i][1]]);
}

Pyramid.prototype = Object.create(Shape.prototype);

Pyramid.prototype.getMiddleCords = function () {
    return [
        this.cords[1][0] + (this.cords[2][0] - this.cords[1][0]) / 2,
        this.cords[0][1] + (this.cords[1][1] - this.cords[0][1]) / 2,
        this.cords[1][2] + (this.cords[4][2] - this.cords[1][2]) / 2
    ];
};