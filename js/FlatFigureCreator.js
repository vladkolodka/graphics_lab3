var FlatFigureCreator = {
    /**
     * Генирирует прямоугольник по 2 координатам
     * @param point1 {Array} point A (x, y)
     * @param point2 {Array} point C (x, y)
     * @return {Array} Points (x, y)
     */
    rectangle: function (point1, point2) {
        var points = [];
        
        points.push(point1); // A
        points.push([point2[0], point1[1]]); // B
        points.push(point2); // C
        points.push([point1[0], point2[1]]); // D

        return points;
    },
    /**
     * Генирирует окружность
     * @param x {number} Координата X центра верхнего круга
     * @param y {number} Координата Y центра верхнего круга
     * @param radius {number} радиус
     * @return {Array} Координаты круга
     */
    circle: function (x, y, radius) {
        var cords = [], xT = x, yT = y;
        var step = Math.PI / 180;

        for (var i = 0; i < Math.PI * 2; i += step){
            xT = x + radius * Math.sin(i);
            yT = y + radius * Math.cos(i);
            cords.push([xT, yT]);
        }
        return cords;
    }
};