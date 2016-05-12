/**
 *
 * @param {Array} elementNames массив id canvas элементов
 * @constructor
 */
function Controller(elementNames) {
    this.elements = [];
    this.viewports = [];
    this.shape = null;
    this.axis = new Axis(0, 0, 0, 500);

    for (var i = 0; i < arguments.length; i++) this.elements.push(document.getElementById(arguments[i]));
    for (i = 0; i < this.elements.length; i++) this.viewports.push(this.elements[i].getContext("2d"));

    this.setViewportsSize(190);
    this.start();

    window.addEventListener("keydown", this.keyPressed, false);
    document.getElementById("toolbar-buttons").addEventListener("click", this.buttonsClick, false);
}

Controller.prototype.start = function () {

    this.shape = new Cube([0, 0], [50, 50], 50);
    // this.shape = new Cylinder(50, 50, 30, 100);
    this.render();
};
/**
 * Изменяет размер всех контролируеых canvas.
 * @param height {number} Высота элементов
 */
Controller.prototype.setViewportsSize = function (height) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].height = height;
    }
};
Controller.prototype.render = function () {
    for (var i = 0; i < this.elements.length; i++) this.clearCanvas(this.elements[i], this.viewports[i]);

    this.axis.render(1, this.viewports[0], "red");
    this.axis.render(2, this.viewports[1], "red");
    this.axis.render(3, this.viewports[2], "red");
    this.axis.render(4, this.viewports[3], "red");

    this.shape.render(1, this.viewports[0]);
    this.shape.render(2, this.viewports[1]);
    this.shape.render(3, this.viewports[2]);
    this.shape.render(4, this.viewports[3]);
};
Controller.prototype.clearCanvas = function (object, canvas) {
    canvas.clearRect(0, 0, object.width, object.height);
};
Controller.prototype.keyPressed = function (event) {
    var self = controller;
    switch (event.keyCode) {
        case 37:
            // left arrow

            self.shape.rotate(2, "x");
            self.render();
            event.preventDefault();
            break;
        case 38:
            self.shape.rotate(2, "y");
            self.render();
            event.preventDefault();
            break;
        case 39:
            self.shape.rotate(2, "z");
            self.render();
            event.preventDefault();
            break;
        case 40:
            self.shape.scale(0.9);
            self.render();
            event.preventDefault();
            break;
    }
};
Controller.prototype.buttonsClick = function(event){
    if(event.target.nodeName != "BUTTON") return;

    var action = event.target.getAttribute("data-action");

    var self = controller;
    switch (action){
        case 'nfc':
            self.shape = new Cube([0, 0], [50, 50], 60);
            break;
        case 'nfp':
            self.shape = new Pyramid([0, 0], [50, 50], 100);
            break;
        case 'nfr':
            self.shape = new Cylinder(30, 30, 30, 100);
            break;
        case 'rxp':
            self.shape.rotate(2, "x");
            break;
        case 'ryp':
            self.shape.rotate(2, "y");
            break;
        case 'rzp':
            self.shape.rotate(2, "z");
            break;
        case 'rxm':
            self.shape.rotate(-2, "x");
            break;
        case 'rym':
            self.shape.rotate(-2, "y");
            break;
        case 'rzm':
            self.shape.rotate(-2, "z");
            break;
        case 'sp':
            self.shape.scale(1.1);
            break;
        case 'sm':
            self.shape.scale(0.9);
            break;
        case 'mxp':
            self.shape.move(2, 0, 0);
            break;
        case 'myp':
            self.shape.move(0, 2, 0);
            break;
        case 'mzp':
            self.shape.move(0, 0, 2);
            break;
        case 'mxm':
            self.shape.move(-2, 0, 0);
            break;
        case 'mym':
            self.shape.move(0, -2, 0);
            break;
        case 'mzm':
            self.shape.move(0, 0, -2);
            break;
    }
    self.render();
};