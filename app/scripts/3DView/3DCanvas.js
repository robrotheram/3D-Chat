

  /**
   * @class renderer
   * @memberOf 3DView
   */

  renderer = {

    /**
     * @name init
     * @function init
     * @memberOf 3DView.renderer
     * @description Sets up the canvas with the id of the div that the 3D view should be
     * @param {Container} con  Container element where the 3D element will live
     */
    init: function (con) {
      this.setSize(con.width(), con.height());
      this.container = document.createElement('div');
      this.container.style.width = this.width;
      this.container.style.height = this.height;
      this.container.appendChild(this.tRenderer.domElement);
      this.camera.position.z = 1000;
      con.append(this.container);
      this.setupControls();
      this.lookat = this.camera.lookat;




        this.scene = new Physijs.Scene({ fixedTimeStep: 1 / 120 });
        this.scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
        this.scene.addEventListener(
            'update',
            function() {
                renderer.scene.simulate( undefined, 2 );
            }
        );
    },
    width: 10,
    height: 10,
    controls: null,
    lookat: null,
    camera: new THREE.PerspectiveCamera(28, this.width / this.height, 1, 100000),
    scene:null,
    tRenderer: new THREE.WebGLRenderer({alpha: true}),
    container: null,
    /**
     * @name updateCamera
     * @function updateCamera
     * @memberOf 3DView.renderer
     * @description Sets up the canvas with the id of the div that the 3D view should be
     */

    updateCamera: function () {
      this.camera = new THREE.PerspectiveCamera(28, this.width / this.height, 1, 100000);
    },

    /**
     * @name setSize
     * @function setSize
     * @memberOf 3DView.renderer
     * @description Sets up the canvas with the id of the div that the 3D view should be
     * @param {integer} w Width of the canvas
     * @param {integer} h Height of the canvas
     */
    setSize: function (w, h) {
      this.width = w;
      this.height = h;
      this.updateCamera();
      this.tRenderer.setSize(w, h);
    },
    /**
     * @name setupControls
     * @function setupControls
     * @memberOf 3DView.renderer
     * @description Sets up the canvas with the id of the div that the 3D view should be
     */
    setupControls: function () {
      this.controls = new THREE.TrackballControls(this.camera, this.container);
      this.controls.rotateSpeed = 4.0;
      this.controls.zoomSpeed = 1.2;
      this.controls.panSpeed = 0.8;
      this.controls.noZoom = false;
      this.controls.noPan = false;
      this.controls.staticMoving = true;
      this.controls.dynamicDampingFactor = 0.3;
      this.controls.keys = [65, 83, 68];

    }
  }

