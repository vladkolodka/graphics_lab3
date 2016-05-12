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

    var step = 1 / stepsCount;

    // find coordinates
    for (var i = 0; i <= 1; i += step) {
        for (var j = 0; j <= 1; j += step) {
            var S = Converter.SingleLineMatrix(j);
            var T = Converter.transpose(Converter.SingleLineMatrix(i));

            this.cords.push(this.getCord(Cx, S, T), this.getCord(Cy, S, T), this.getCord(Cz, S, T));
        }
    }

    // create connections
    for (i = 0; i < this.cords.length; i += stepsCount){
        for (j = i; j < j + stepsCount - 1; j++) this.connections.push([j, j + 1]);
        if(i + 1 < stepsCount) this.connections.push(i, i * stepsCount);
    }
}

HermiteSurface.prototype = Object.create(Shape.prototype);

HermiteSurface.prototype.getCord = function(Cn, S, T){
    return Converter.multiply(Converter.multiply(Converter.multiply(Converter.multiply(S, Converter.HermiteMatrix), Cn), Converter.transpose(Converter.HermiteMatrix)), T)[0][0];
};