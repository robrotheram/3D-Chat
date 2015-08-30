
  /**
   * @class _3DView
   * @memberOf 3DView
   */

  var texture = THREE.ImageUtils.loadTexture('images/steel.jpg');
  //texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  _3DView = {
    renderer: renderer,

    /**
     * @name new
     * @function new
     * @memberOf 3DView._3DView
     * @description Reset the _3DView with defualt values. Call before setting up the canvas
     */
    new: function () {

      this.models.reset();
      this.animate = null;
      this.vector = new THREE.Vector3();
      this.testnumber = 100;
      this.raycaster = new THREE.Raycaster();
      this.outercontainer = null;
      this.speed = 0.005;
      this.play = false;

    },
    /**
     * @name init
     * @function init
     * @memberOf 3DView._3DView
     * @description Sets up the canvas with the id of the div that the 3D view should be
     * @param {string} containerID div id of the container ID
     *
     */
    init: function (containerID) {
      this.outercontainer = $(containerID);
      this.renderer.init($(containerID));
      this.load();
      this.renderer.camera.position.x = 40;
      this.renderer.camera.position.y = 22;
      this.renderer.camera.position.z = 35;
      document.addEventListener('click', this.onSelectPart);

    },
    animate: null,
    models: modelManager,
    vector: new THREE.Vector3(),
    testnumber: 100,
    raycaster: new THREE.Raycaster(),
    outercontainer: null,
    speed: 0.005,
    play: false,

    /**
     * @name load
     * @function load
     * @memberOf 3DView._3DView
     * @description call the load function in model
     *
     */
    load: function () {

      this.models.load(this.renderer.scene);
    },
    /**
     * @name reset
     * @function reset
     * @memberOf 3DView._3DView
     * @description reset the camera to default positions
     *
     */
    reset: function () {
      this.play = false;
      this.renderer.camera.position.x = 150;
      this.renderer.camera.position.y = 40;
      this.renderer.camera.position.z = 150;
    },
    selectPart: null,
    /**
     * @name onSelectPart
     * @function onSelectPart
     * @memberOf 3DView._3DView
     * @description Called when there is a mouse click on the container. Calculates relative mosuse position in 3D space then uses THREE.RayCaster to get list of objects that the user could click on then sends the top most one the selectpart function
     * @param {Mouse}event Mouse Event
     */
    onSelectPart: function (event) {
      var mouse = {x: 0, y: 0};
      mouse.x = ((event.clientX - _3DView.outercontainer.offset().left) / _3DView.outercontainer.width() ) * 2 - 1;
      mouse.y = -(((event.pageY - _3DView.outercontainer.offset().top) / _3DView.outercontainer.outerHeight() ) * 2 - 1);
      _3DView.vector.set(mouse.x, mouse.y, 0.5);
      _3DView.vector.unproject(_3DView.renderer.camera);
      _3DView.raycaster.set(_3DView.renderer.camera.position,
        _3DView.vector.sub(_3DView.renderer.camera.position).normalize());

      jetEngineArr = _3DView.models.convertToArray();
      intersects = _3DView.raycaster.intersectObjects(jetEngineArr);
      for (var modelID in _3DView.models.models) {
        _3DView.models.models[modelID].material = _3DView.models.modelMaterialArray[modelID]; // new THREE.MeshNormalMaterial();  // modelManager.materialarray[modelID];
      }
      if (intersects.length > 0) {
        _3DView.selectPart(intersects[0].object);
      }
    }
  }
