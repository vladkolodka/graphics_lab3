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

    var rotationDialsNodes = [].slice.call(document.getElementsByClassName('rotations')[0].getElementsByClassName('dial'));
    this.rotationDials = [];
    var self = this;
    rotationDialsNodes.forEach(function (dial) {
        var dialObject = JogDial(dial, {
            minDegree: 0,
            maxDegree: 360
        });
        dialObject.on('mousemove', self.rotate);
        self.rotationDials.push(dialObject);
    });
    console.log(this.rotationDials);
}

Controller.prototype.start = function () {

    this.shape = new Cube([0, 0], [50, 50], 50);
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
    switch (event.keyCode) {
        case 37:
            // left arrow

            controller.shape.rotate(2, "x");
            controller.render();
            event.preventDefault();
            break;
        case 38:
            controller.shape.rotate(2, "y");
            controller.render();
            event.preventDefault();
            break;
        case 39:
            controller.shape.rotate(2, "z");
            controller.render();
            event.preventDefault();
            break;
        case 40:
            controller.shape.scale(0.9);
            controller.render();
            event.preventDefault();
            break;
    }
};
Controller.prototype.resetRotationDials = function () {
    for(var i = 0; i < controller.rotationDials.length; i++) controller.rotationDials[i].angle(0);
};
Controller.prototype.buttonsClick = function (event) {
    if (event.target.nodeName != "BUTTON") return;

    var action = event.target.getAttribute("data-action");
    switch (action) {
        case 'nfc':
            controller.shape = new Cube([0, 0], [50, 50], 50);
            controller.resetRotationDials();
            break;
        case 'nfp':
            controller.shape = new Pyramid([0, 0], [50, 50], 100);
            controller.resetRotationDials();
            break;
        case 'nfr':
            controller.shape = new Cylinder(30, 30, 30, 100);
            controller.resetRotationDials();
            break;
        case 'nfs':
            controller.shape = new HermiteSurface([], [], [], 10);
            controller.resetRotationDials();
            break;
        case 'sp':
            controller.shape.scale(1.1);
            break;
        case 'sm':
            controller.shape.scale(0.9);
            break;
        case 'mxp':
            controller.shape.move(2, 0, 0);
            break;
        case 'myp':
            controller.shape.move(0, 2, 0);
            break;
        case 'mzp':
            controller.shape.move(0, 0, 2);
            break;
        case 'mxm':
            controller.shape.move(-2, 0, 0);
            break;
        case 'mym':
            controller.shape.move(0, -2, 0);
            break;
        case 'mzm':
            controller.shape.move(0, 0, -2);
            break;
    }
    controller.render();
};
Controller.prototype.rotate = function (event) {
    var rotation = event.target.rotation;
    var prevRotation = event.target.parentNode.getAttribute('data-prev');
    // console.log("Rotate " + event.target.parentNode.getAttribute('data-axe') + "; " + (rotation - prevRotation));
    controller.shape.rotate(rotation - prevRotation, event.target.parentNode.getAttribute('data-axe'));

    event.target.parentNode.setAttribute('data-prev', rotation);
    controller.render();
};