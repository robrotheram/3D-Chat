    /**
     * @class jetengine
     * @memberOf angular_module
     */
var trees =[];
    var sky, sunSphere;

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
        _3DView.renderer.controls.maxDistance = 6000;


        _3DView.models.datafile = "scripts/models/";

         loadMorph(_3DView.models.datafile + "animals/bearBrown.json");
         loadMorph(_3DView.models.datafile + "animals/cow.json");

          loadMorph(_3DView.models.datafile + "animals/cow.json");
          loadMorph(_3DView.models.datafile + "animals/cow.json");
          loadMorph(_3DView.models.datafile + "animals/cow.json");
          loadMorph(_3DView.models.datafile + "animals/cow.json");

          var path = 'images/skybox/';
          var sides = [ path + 'sbox_px.jpg', path + 'sbox_nx.jpg', path + 'sbox_py.jpg', path + 'sbox_ny.jpg', path + 'sbox_pz.jpg', path + 'sbox_nz.jpg' ];

          // load images
          var scCube = THREE.ImageUtils.loadTextureCube(sides);
          scCube.format = THREE.RGBFormat;

          // prepare skybox material (shader)
          var skyShader = THREE.ShaderLib["cube"];
          skyShader.uniforms["tCube"].value = scCube;
          var skyMaterial = new THREE.ShaderMaterial( {
              fragmentShader: skyShader.fragmentShader, vertexShader: skyShader.vertexShader,
              uniforms: skyShader.uniforms, depthWrite: false, side: THREE.BackSide
          });

          // create Mesh with cube geometry and add to the scene
          var skyBox = new THREE.Mesh(new THREE.CubeGeometry(10000, 10000, 10000), skyMaterial);
          skyBox.position.set(0,200,0);
          skyMaterial.needsUpdate = true;

          _3DView.models.scene.add(skyBox);








          new THREE.JSONLoader().load((_3DView.models.datafile + "test.json"), function(geometry,materials) {

              var materialx = [];
              for (var x =0; x<materials.length;x++) {
                  materialx.push(new THREE.MeshLambertMaterial({color: materials[x].color}));
              }
              var material = new THREE.MeshFaceMaterial(materialx);


              for ( var i = 0; i < 300; i ++ ) {


                 var x = (getRandomInt(-(4700),(4700)))-2500;

                 var z = (getRandomInt(-(4700),(4700)))+2500;


                  var tree = new THREE.Mesh(geometry,material);
                  tree.scale.set(20, 20, 20);
                  tree.position.set( x, 0, z);
                  tree.rotation.y = THREE.Math.randFloat( -0.25, 0.25 );
                  _3DView.models.scene.add(tree);



              }
          });


          function getRandomInt(min, max) {
              return Math.floor(Math.random() * (max - min + 1) + min);
          }

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
        function loadMorph(filename) {
            _3DView.models.loader.load(filename, _3DView.models.morphloader(filename));
        }

      function terrain() {
        var parameters = {
          alea: RAND_MT,
          generator: PN_GENERATOR,
          width: 10000,
          height: 10000,
          widthSegments:220,
          heightSegments:220,
          depth: 600,
          param: 10,
          filterparam: 0,
          filter: [ BLUR_FILTER ],
          postgen: [ MOUNTAINS_COLORS ],
          effect: [ DEPTHNOISE_EFFECT ]
        };

        var terrainGeo = TERRAINGEN.Get( parameters );
        var terrainMaterial = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors , shading: (THREE.FlatShading) } );

        var terrain = new THREE.Mesh( terrainGeo, terrainMaterial );
          terrain.position.set( 0, (- parameters.depth / 2), 0 );
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
        _3DView.models.lights['mainLight'] = new THREE.DirectionalLight(0xffffff, 0.6);
        _3DView.models.lights['mainLight'].position.set(0, 20, 0);
        _3DView.models.scene.add(_3DView.models.lights['mainLight']);
      }


      init();

      terrain();
      //initSky();


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
