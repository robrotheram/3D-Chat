    /**
     * @class jetengine
     * @memberOf angular_module
     */


    webapp.controller('mainController', function ($scope) {
      $scope.pageName = "<Chat Room Name Here>";
      var height = $("#mainPanelBody").height();
      height += 55;
      $("#materialBody").height(height);


      console.log("hello");
      /**
       * @name $init
       * @function init
       * @memberOf angular_module.jetengine
       * @description Sets up the entire page. Loads in the module and texture. Loads the material list and the custom check section
       */

      function init() {
        _3DView.new();
        _3DView.init("#jet");

        /**
         * Sets up the cutom animation of the renderer
         */
        ms_Clock = new THREE.Clock();

        _3DView.animate = function () {

          var aDelta = ms_Clock.getDelta();

          this.renderer.tRenderer.render(renderer.scene, renderer.camera);
          this.renderer.controls.update();
          if (_3DView.play) {
            for (var i = 0, keys = Object.keys(_3DView.models.morphs), ii = keys.length; i < ii; i++) {
              var obj = _3DView.models.morphs[keys[i]];
              obj.updateAnimation(1000 * aDelta);
            }
          }


          requestAnimationFrame(function () {
            _3DView.animate();
          });
        };
        selectMaterial = new THREE.MeshPhongMaterial({
          // light
          specular: '#a9fcff',
          // intermediate
          color: '#00abb1',
          // dark
          emissive: '#006063',
          shininess: 100
        });
        _3DView.selectPart = function (model) {
        };

        _3DView.renderer.controls.minDistance = 500;
        _3DView.renderer.controls.maxDistance = 9000;


        _3DView.models.datafile = "scripts/models/animals/";

        loadModel(_3DView.models.datafile + "bearBrown.json");
        loadModel(_3DView.models.datafile + "cow.json");


        setUPLights();

        _3DView.renderer.camera.position.x = 800;
        _3DView.renderer.camera.position.y = 120;
        _3DView.renderer.camera.position.z = 800;


      }

      /**
       * @name loadModel
       * @function loadModel
       * @memberOf angular_module.jetengine
       * @param {String} filename relative File Path to the model
       * @description send the relative file path to the model
       */
      function loadModel(filename) {
        _3DView.models.loader.load(filename, _3DView.models.meshloader(filename));
      }

      function terrain() {
        var parameters = {
          alea: RAND_MT,
          generator: PN_GENERATOR,
          width: 2500,
          height: 2500,
          widthSegments: 500,
          heightSegments: 500,
          depth: 500,
          param: 3,
          filterparam: 1,
          filter: [ BLUR_FILTER ],
          postgen: [ MOUNTAINS_COLORS ],
          effect: [ DEPTHNOISE_EFFECT ]
        };

        var terrainGeo = TERRAINGEN.Get( parameters );
        var terrainMaterial = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors , shading: (THREE.SmoothShading) } );

        var terrain = new THREE.Mesh( terrainGeo, terrainMaterial );
        terrain.position.y = - parameters.depth / 2;
        if( this.ms_Terrain != null )
          _3DView.models.scene.remove( this.ms_Terrain );

        _3DView.models.scene.add( terrain );
        this.ms_Terrain = terrain;
        this.ms_Terrain.castShadow = true;
        this.ms_Terrain.receiveShadow = true;





      }




      /**
       * @name loadMaterials
       * @function loadMaterials
       * @memberOf angular_module.jetengine

       * @description Load the required lights for the model
       */
      function setUPLights() {
        _3DView.models.lights['mainLight'] = new THREE.DirectionalLight(0xffffff, 0.5);
        _3DView.models.lights['mainLight'].position.set(0, 1, 0);
        _3DView.models.scene.add(_3DView.models.lights['mainLight']);
      }


      init();
      terrain();
      _3DView.animate();

      /**
       * @memberOf angular_module.jetengine
       * Set up the play pause button
       */

      $("#playbtn").click(function (event) {
        _3DView.play = !_3DView.play;
        if (_3DView.play) {
          $("#playbtn").html('Puase');
        } else {
          $("#playbtn").html('Play');
        }
      });


      /**
       * @memberOf angular_module.jetengine
       * @description Set up the play pause button
       */

      $("#resetbtn").click(function (event) {
        _3DView.renderer.camera.position.x = 150;
        _3DView.renderer.camera.position.y = 50;
        _3DView.renderer.camera.position.z = 150;
        _3DView.renderer.camera.lookat = _3DView.renderer.lookat;
      });


      /**
       * @memberOf angular_module.jetengine
       * @description Set up dropdown area
       */
      $(document).on('click', ".dropedIMG", function () {
        $("#FanCheck").css('background-color', '#FFF');
        $(this).remove();
        $("#FanCheck").append('<style>#FanCheck::before{padding-top: 100%;}</style>');
        $("#FanCheck").append('<style>#FanCheck{border: solid;border-radius:50%; }</style>');
        $("#FanCheck").html('<span class="drop-thing-text"><h4>Drop Material here</h4></span>');

      });

    });
