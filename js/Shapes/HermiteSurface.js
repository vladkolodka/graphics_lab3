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

    // TODO right values for correct rotation
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
            var S = Converter.SingleLineMatrix(i);
            var T = Converter.transpose(Converter.SingleLineMatrix(j));

            this.cords.push([this.getCord(Cx, S, T) , this.getCord(Cy, S, T), this.getCord(Cz, S, T)]);
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

/**
 * Get point coordinate
 * @param Cn {Array<Array<number>>}
 * @param S {Array<Array<number>>}
 * @param T {Array<Array<number>>}
 * @returns {number}
 */
HermiteSurface.prototype.getCord = function (Cn, S, T) {
    // S*M*Cn*mT*tT
    return Converter.multiply(S, Converter.multiply(Converter.HermiteMatrix, Converter.multiply(Cn, Converter.multiply(Converter.HermiteMatrixT, T))))[0][0];
};