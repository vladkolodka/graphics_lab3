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
    this.surface = {
        Cx: [],
        Cy: [],
        Cz: [],
        fields: document.getElementById('surface-input-fields').getElementsByTagName('input'),
        panel: document.getElementById('surface_panel')
    };

    // remember canvas elements
    for (var i = 0; i < arguments.length; i++) this.elements.push(document.getElementById(arguments[i]));
    for (i = 0; i < this.elements.length; i++) this.viewports.push(this.elements[i].getContext("2d"));

    // resize canvas elements
    this.setViewportsSize(190);

    // set toolbar buttons onClick action
    document.getElementsByClassName("toolbar")[0].addEventListener("click", this.buttonsClick, false);

    // set up rotation dials
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

    this.surface.radios = document.getElementsByName('axe');
    [].slice.call(this.surface.radios).forEach(function (radio) {
        radio.addEventListener('change', self.surfaceRadioChanged, false);
    });

    [].slice.call(this.surface.fields).forEach(function (field) {
        field.addEventListener('change', self.surfaceFieldChanged, false);
    });

    // default figure on screen
    this.shape = new Cube([0, 0], [50, 50], 50);
    this.render();
}
/**
 * Surface fields: action (changed)
 * @param event {Event}
 */
Controller.prototype.surfaceFieldChanged = function (event) {
    var index = Array.prototype.indexOf.call(controller.surface.fields, event.target);

    var C;
    var axeName;
    for (var i = 0; i < controller.surface.radios.length; i++) {
        if(controller.surface.radios[i].checked) {
            axeName = controller.surface.radios[i].value;
            break;
        }
    }
    switch (axeName){
        case 'x':
            C = controller.surface.Cx;
            break;
        case 'y':
            C = controller.surface.Cy;
            break;
        case 'z':
            C = controller.surface.Cz;
            break;
    }

    var tempI = parseInt(index / 4);
    C[tempI][index - tempI * 4] = Number(event.target.value);
};

/**
 * Fill surface panel fields with values from matrix `C`
 * @param C {Array<Array<number>>} Matrix
 */
Controller.prototype.fillSurfaceFields = function (C) {
    for (var i = 0; i < this.surface.fields.length; i++) {
        var tempI = parseInt(i / 4);
        this.surface.fields[i].value = C[tempI][i - tempI * 4];
    }
};
/**
 * Surface axe radios: action (changed)
 * @param event {Event}
 */
Controller.prototype.surfaceRadioChanged = function (event) {
    var axeName = event.target.value;

    switch (axeName) {
        case 'x':
            controller.fillSurfaceFields(controller.surface.Cx);
            break;
        case 'y':
            controller.fillSurfaceFields(controller.surface.Cy);
            break;
        case 'z':
            controller.fillSurfaceFields(controller.surface.Cz);
            break;
    }
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
/**
 * Render all viewports
 */
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
/**
 * Sets all rotation dials to 0 degree
 */
Controller.prototype.resetRotationDials = function () {
    for (var i = 0; i < controller.rotationDials.length; i++) controller.rotationDials[i].angle(0);
};
Controller.prototype.buttonsClick = function (event) {
    if (event.target.nodeName != "BUTTON") return;

    var action = event.target.getAttribute("data-action");

    // if clicked button creates new figure
    if(action.indexOf('nf') == 0) {
        controller.surface.panel.classList.add('hidden-panel');
        controller.resetRotationDials();
    }
    switch (action) {
        case 'nfc':
            controller.shape = new Cube([0, 0], [50, 50], 50);
            break;
        case 'nfp':
            controller.shape = new Pyramid([0, 0], [50, 50], 100);
            break;
        case 'nfr':
            controller.shape = new Cylinder(30, 30, 30, 100);
            break;
        case 'nfs':
            /*
            Hermite surface
            [  P00,       P01,       dP00/dt,      dP01/dt     ],
            [  P10,       P11,       dP10/dt,      dP11/dt     ],
            [  dP00/ds,   dP01/ds,   d2P00/dsdt,   d2P01/dsdt  ],
            [  dP10/ds,   dP11/ds,   d2P10/dsdt,   d2P11/dsdt  ]
             */
            controller.surface.Cx = [
                [-50, -50, 0, 0],
                [120, 120, 0, 0],
                [0, 0, 30, 30],
                [0, 0, 500, 60]
            ];
            controller.surface.Cy = [
                [100, 100, 0, 0],
                [0, 0, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, -500]
            ];
            controller.surface.Cz = [
                [50, 0, 0, 0],
                [50, -50, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];

            for (var i = 1; i < controller.surface.radios.length; i++) controller.surface.radios[i].checked = false;
            controller.surface.radios[0].checked = true;

            controller.fillSurfaceFields(controller.surface.Cx);

            controller.shape = new HermiteSurface(controller.surface.Cx, controller.surface.Cy, controller.surface.Cz, 17);
            controller.surface.panel.classList.remove('hidden-panel');
            break;
        // scale ++
        case 'sp':
            controller.shape.scale(1.1);
            break;
        // scale --
        case 'sm':
            controller.shape.scale(0.9);
            break;
        // move X+
        case 'mxp':
            controller.shape.move(2, 0, 0);
            break;
        // move Y+
        case 'myp':
            controller.shape.move(0, 2, 0);
            break;
        // move Z+
        case 'mzp':
            controller.shape.move(0, 0, 2);
            break;
        // move X-
        case 'mxm':
            controller.shape.move(-2, 0, 0);
            break;
        // move Y-
        case 'mym':
            controller.shape.move(0, -2, 0);
            break;
        // move Z-
        case 'mzm':
            controller.shape.move(0, 0, -2);
            break;
        case 'updateSurface':
            controller.resetRotationDials();
            controller.shape = new HermiteSurface(controller.surface.Cx, controller.surface.Cy, controller.surface.Cz, 17);
            break;
    }
    controller.render();
};
/**
 * Dials: on action (rotation)
 * @param event {Event}
 */
Controller.prototype.rotate = function (event) {
    var rotation = event.target.rotation;
    var prevRotation = event.target.parentNode.getAttribute('data-prev');
    controller.shape.rotate(rotation - prevRotation, event.target.parentNode.getAttribute('data-axe'));

    event.target.parentNode.setAttribute('data-prev', rotation);
    controller.render();
};