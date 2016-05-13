/**
 * Поверхность Эрмита
 * @param Cx {Array<Array<number>>}
 * @param Cy {Array<Array<number>>}
 * @param Cz {Array<Array<number>>}
 * @param stepsCount {number} Количество шагов
 * @constructor
 */
function HermiteSurface(Cx, Cy, Cz, stepsCount) {
    this.cords = [];
    this.connections = [];

    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.halfX = 0;
    this.halfY = 0;
    this.halfZ = 0;

    var step = 1 / stepsCount;

    // find coordinates
    for (var i = step; i <= 1; i += step) {
        for (var j = step; j <= 1; j += step) {
            var S = Converter.SingleLineMatrix(j);
            var T = Converter.transpose(Converter.SingleLineMatrix(i));

            this.cords.push([this.getCord(Cx, S, T), this.getCord(Cy, S, T), this.getCord(Cz, S, T)]);

            // this.cords.push([j * stepsCount * 10, (j / i) * stepsCount, i * stepsCount * 10]);
        }
    }

    // create connections
    for (i = 0; i < this.cords.length; i += stepsCount) {
        for (j = i; j < i + stepsCount; j++) {
            if((j + 1) % stepsCount != 0) this.connections.push([j, j + 1]);
            if(j + stepsCount < this.cords.length) this.connections.push([j, j + stepsCount]);
        }
    }
}

HermiteSurface.prototype = Object.create(Shape.prototype);

HermiteSurface.prototype.getCord = function (Cn, S, T) {
    return Converter.multiply(Converter.multiply(Converter.multiply(Converter.multiply(S, Converter.HermiteMatrix), Cn), Converter.transpose(Converter.HermiteMatrix)), T)[0][0];
};