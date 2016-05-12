var Converter = {
    IsometricMatrix: [
        [0.707, -0.408, 0],
        [0, 0.816, 0],
        [-0.707, -0.408, 0]
    ],
    HermiteMatrix: [
        [2, -2, 1, -1],
        [-3, 3, -2, -1],
        [0, 0, 1, 0],
        [0, 0, 0, 0]
    ],
    toTopView: function (cords) {
        var newCords = [];
        for (var i = 0; i < cords.length; i++) newCords.push([cords[i][0], cords[i][2] * -1]);
        return newCords;
    },
    toSideView: function (cords) {
        var newCords = [];
        for (var i = 0; i < cords.length; i++) newCords.push([cords[i][2], cords[i][1] * -1]);
        return newCords;
    },
    toFrontView: function (cords) {
        var newCords = [];
        for (var i = 0; i < cords.length; i++) newCords.push([cords[i][0], cords[i][1] * -1]);
        return newCords;
    },
    /**
     * Приводит координаты к изометрическому представлению
     * @param cords {Array}
     * @return {Array}
     */
    toIsometricView: function (cords) {
        var newCords = [];
        var temp;

        for (var i = 0; i < cords.length; i++) {
            temp = this.multiply([
                [cords[i][0], cords[i][1], cords[i][2]]
            ], this.IsometricMatrix);
            newCords.push([temp[0][0] * -1, temp[0][1] * -1]);
        }

        return newCords;
    },
    /**
     * Производит умножение матриц
     * @param A {Array<Array<number>>} Матрица A
     * @param B {Array<Array<number>>} Матрица B
     * @return {Array<Array<number>>} Результирующая матрица
     */
    multiply: function (A, B) {
        var rowsA = A.length, colsA = A[0].length,
            rowsB = B.length, colsB = B[0].length,
            C = [];

        if (colsA != rowsB) return [];

        for (var i = 0; i < rowsA; i++) C[i] = [];

        for (var k = 0; k < colsB; k++) {
            for (i = 0; i < rowsA; i++) {
                var temp = 0;
                for (var j = 0; j < rowsB; j++) temp += A[i][j] * B[j][k];
                C[i][k] = temp;
            }
        }

        return C;
    },
    /**
     * Транспонировать матрицу
     * @param Matrix {Array<Array<number>>}
     * @return {Array<Array<number>>} транспонированная матрица
     */
    transpose: function (Matrix) {
        return Matrix[0].map(function(col, i) {
            return Matrix.map(function(row) {
                return row[i]
            });
        });
    },
    /**
     * Создает матрицу T/S
     * @param value Здачение
     * @return {Array<Array<number>>}
     */
    SingleLineMatrix: function (value) {
        return [[Math.pow(value, 3), Math.pow(value, 2), value, 1]];
    }
};