var Converter = {
    /*isometricMatrix: [
        [0.707, -0.408, 0, 0],
        [0, 0.816, 0, 0],
        [-0.707, -0.408, 0, 0],
        [0, 0, 0, 1]
    ],*/
    isometricMatrix: [
     [0.707, -0.408, 0],
     [0, 0.816, 0],
     [-0.707, -0.408, 0]
    ],
    toTopView: function(cords){
        var newCords = [];
        for (var i = 0; i < cords.length; i++) newCords.push([cords[i][0], cords[i][2]]);
        return newCords;
    },
    toSideView: function(cords){
        var newCords = [];
        for (var i = 0; i < cords.length; i++) newCords.push([cords[i][2], cords[i][1] * -1]);
        return newCords;
    },
    toFrontView: function(cords){
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

        for (var i = 0; i < cords.length; i++){
            temp = this.multiply([
                [cords[i][0], cords[i][1], cords[i][2]]
            ], this.isometricMatrix);
            newCords.push([temp[0][0] * -1, temp[0][1] * -1]);
        }

        return newCords;
    },
    /**
     * Производит умножение матриц
     * @param A {Array} Матрица A
     * @param B {Array} Матрица B
     * @return {Array} Результирующая матрица
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
    }
};