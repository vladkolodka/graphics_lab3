function Pyramid(point1, point2, height){
    this.cords = [];
    // ribs
    this.connections = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [0, 4], [1, 4], [2, 4], [3, 4]
    ];
    var offset = 0;

    this.x = point1[0];
    this.y = offset;
    this.z = point1[1];

    this.halfX = (point2[0] - point1[0]) / 2;
    this.halfY = height / 2;
    this.halfZ = (point2[1] - point1[1]) / 2;

    // get 2D rectangle coordinates
    var cords2d = FlatFigureCreator.rectangle(point1, point2);
    
    // transform to 3D coordinates
    for (var i = 0; i < cords2d.length; i++) this.cords.push([cords2d[i][0], offset, cords2d[i][1]]);

    offset += height;
    this.cords.push([point1[0] + (point2[0] - point1[0]) / 2, offset, point1[1] + (point2[1] - point1[1]) / 2]);

}

Pyramid.prototype = Object.create(Shape.prototype);