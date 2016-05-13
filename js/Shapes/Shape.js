function Shape() {
    this.cords = [];
    this.connections = [];

    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.halfX = 0;
    this.halfY = 0;
    this.halfZ = 0;
}

/**
 * Средняя точка фигуры
 * @return {Array}
 */
Shape.prototype.getMiddleCords = function () {
    return [
        this.x + this.halfX,
        this.y + this.halfY,
        this.z + this.halfZ
    ];
};
/**
 * Перемещение фигуры
 * @param x {number}
 * @param y {number}
 * @param z {number}
 * @return {void}
 */
Shape.prototype.move = function (x, y, z) {
    this.x += x;
    this.y += y;
    this.z += z;

    for (var i = 0; i < this.cords.length; i++) {
        this.cords[i][0] += x;
        this.cords[i][1] += y;
        this.cords[i][2] += z;
    }
};
/**
 * Масштабирование фигуры
 * @param S {number}
 * @return {void}
 */
Shape.prototype.scale = function (S) {
    var middleCords = this.getMiddleCords();

    this.move(-middleCords[0], -middleCords[1], -middleCords[2]);
    for (var i = 0; i < this.cords.length; i++) {
        this.cords[i][0] *= S;
        this.cords[i][1] *= S;
        this.cords[i][2] *= S;
    }
    this.move(middleCords[0], middleCords[1], middleCords[2]);
};
/**
 * Поворачивает фигуру
 * @param deg {number} Градус поворота
 * @param type {string} Ось поворота (x/y/z)
 * @return {void}
 */
Shape.prototype.rotate = function (deg, type) {
    var rad = deg * Math.PI / 180;
    var matrix = [];

    switch (type) {
        case 'z':
            matrix = [
                [Math.cos(rad), Math.sin(rad), 0, 0],
                [-Math.sin(rad), Math.cos(rad), 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ];
            break;
        case 'x':
            matrix = [
                [1, 0, 0, 0],
                [0, Math.cos(rad), Math.sin(rad), 0],
                [0, -Math.sin(rad), Math.cos(rad), 0],
                [0, 0, 0, 1]
            ];
            break;
        case 'y':
            matrix = [
                [Math.cos(rad), 0, Math.sin(rad), 0],
                [0, 1, 0, 0],
                [-Math.sin(rad), 0, Math.cos(rad), 0],
                [0, 0, 0, 1]
            ];
            break;
    }
    var middleCords = this.getMiddleCords();
    var temp = [];

    this.move(-middleCords[0], -middleCords[1], -middleCords[2]);
    for (var i = 0; i < this.cords.length; i++) {
        temp = Converter.multiply([
            [this.cords[i][0], this.cords[i][1], this.cords[i][2], 1]
        ], matrix);

        this.cords[i][0] = temp[0][0];
        this.cords[i][1] = temp[0][1];
        this.cords[i][2] = temp[0][2];
    }
    this.move(middleCords[0], middleCords[1], middleCords[2]);
};
/**
 * Визуализация фигуры
 * @param mode {number} Режим проекции
 * @param canvas {object} Объект для рисования
 * @param color Цвет фигуры
 * @return {void}
 */
Shape.prototype.render = function (mode, canvas, color) {
    var newCords = [];
    var offset = 100;
    switch (mode) {
        case 1:
            newCords = Converter.toTopView(this.cords);
            break;
        case 2:
            newCords = Converter.toSideView(this.cords);
            break;
        case 3:
            newCords = Converter.toFrontView(this.cords);
            break;
        case 4:
            newCords = Converter.toIsometricView(this.cords);
            break;
    }

    if (color == undefined) color = "black";

    canvas.strokeStyle = color;
    canvas.beginPath();
    for (var i = 0; i < this.connections.length; i++) {
        canvas.moveTo(newCords[this.connections[i][0]][0] + offset, newCords[this.connections[i][0]][1] + offset);
        canvas.lineTo(newCords[this.connections[i][1]][0] + offset, newCords[this.connections[i][1]][1] + offset);
    }
    canvas.stroke();
};