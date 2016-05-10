/**
 * Оси
 * @param x {number} начальный X
 * @param y {number} начальный Y
 * @param z {number} начальный Z
 * @param length {number} длина каждой оси
 * @constructor
 */
function Axis(x, y, z, length){
    this.cords = [
        // [x, y, z], [x - length, y, z], [x, y - length, z], [x, y, z - length]
        [x, y, z], [x + length, y, z], [x, y + length, z], [x, y, z + length]
    ];
    this.connections = [
        [0, 1], [0, 2], [0, 3]
    ];
}

Axis.prototype = Object.create(Shape.prototype);