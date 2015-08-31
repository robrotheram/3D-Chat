    /**
     * @class jetengine
     * @memberOf angular_module
     */
var trees =[];
    var sky;
    Physijs.scripts.worker = 'scripts/physijs_worker.js';
    Physijs.scripts.ammo = 'ammo.js';

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

        init = function () {
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
            loadMorph(_3DView.models.datafile + "animals/cow.json");
            loadMorph(_3DView.models.datafile + "animals/cow.json");
            loadMorph(_3DView.models.datafile + "animals/cow.json");
            loadMorph(_3DView.models.datafile + "animals/cow.json");
            var path = 'images/skybox/';
            var sides = [path + 'sbox_px.jpg', path + 'sbox_nx.jpg', path + 'sbox_py.jpg', path + 'sbox_ny.jpg', path + 'sbox_pz.jpg', path + 'sbox_nz.jpg'];

            // load images
            var scCube = THREE.ImageUtils.loadTextureCube(sides);
            scCube.format = THREE.RGBFormat;

            // prepare skybox material (shader)
            var skyShader = THREE.ShaderLib["cube"];
            skyShader.uniforms["tCube"].value = scCube;
            var skyMaterial = new THREE.ShaderMaterial({
              fragmentShader: skyShader.fragmentShader, vertexShader: skyShader.vertexShader,
              uniforms: skyShader.uniforms, depthWrite: false, side: THREE.BackSide
            });

            // create Mesh with cube geometry and add to the scene
            var skyBox = new THREE.Mesh(new THREE.CubeGeometry(10000, 10000, 10000), skyMaterial);
            skyBox.position.set(0, 200, 0);
            skyMaterial.needsUpdate = true;

            _3DView.models.scene.add(skyBox);


            new THREE.JSONLoader().load((_3DView.models.datafile + "test.json"), function (geometry, materials) {
                var materialx = [];
                for (var x = 0; x < materials.length; x++) {
                      materialx.push(new THREE.MeshLambertMaterial({color: materials[x].color}));
                }
                var material = new THREE.MeshFaceMaterial(materialx);
                for (var i = 0; i < 300; i++) {
                    var x = (getRandomInt(-(4700), (4700))) - 2500;
                    var z = (getRandomInt(-(4700), (4700))) + 2500;
                    var tree = new THREE.Mesh(geometry, material);
                    tree.scale.set(20, 20, 20);
                    tree.position.set(x, 0, z);
                    tree.rotation.y = THREE.Math.randFloat(-0.25, 0.25);
                    _3DView.models.scene.add(tree);
                }
            });
            // Materials
            ground_material = Physijs.createMaterial(
                new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors , shading: (THREE.FlatShading) } )
            );
            // Ground

            noise.seed(0);


            var colors = [];
            var depth = 600;
            var step = 1000;
            var ground_geometry = new THREE.PlaneGeometry( 10000,10000, 220, 220 );
            var noisex = PN_GENERATOR;
            var inWidth = 10000;
            var inHeight = 10000;
            var inDepth = 300;

            var tmp = terrain();
            console.log(tmp,ground_geometry.vertices.length);
            for ( var i = 0; i < ground_geometry.vertices.length; i++ ) {
                var vertex = ground_geometry.vertices[i];

                //vertex.z = NoiseGen.noise( vertex.x / 10, vertex.y / 10 ) * 50;

                var value = Math.abs(noise.simplex3(vertex.x/2500,vertex.y/2500,1000));
                value *= 1000;

                vertex.z = value;


            }


            new THREE.JSONLoader().load((_3DView.models.datafile + "test.json"), function (geometry, materials) {
                var materialx = [];
                for (var x = 0; x < materials.length; x++) {
                    materialx.push(new THREE.MeshLambertMaterial({color: materials[x].color}));
                }
                var material = new THREE.MeshFaceMaterial(materialx);
                for (var i = 0; i < 300; i++) {
                    var x = (getRandomInt(-(4700), (4700))) - 2500;
                    var z = (getRandomInt(-(4700), (4700))) + 2500;

                    var y = getheight(ground_geometry,x,z);
                    console.log(y);
                    var tree = new THREE.Mesh(geometry, material);
                    tree.scale.set(20, 20, 20);

                    tree.position.set(x, y, z);
                    tree.rotation.y = THREE.Math.randFloat(-0.25, 0.25);
                    _3DView.models.scene.add(tree);
                }
            });









            ground_geometry.computeFaceNormals();
            ground_geometry.computeVertexNormals();

            var terrainMaterial = new THREE.MeshPhongMaterial( { color:0x50B948 , shading: (THREE.FlatShading) } );

            // If your plane is not square as far as face count then the HeightfieldMesh
            // takes two more arguments at the end: # of x faces and # of y faces that were passed to THREE.PlaneMaterial
            var ground = new Physijs.HeightfieldMesh(
                ground_geometry,
                terrainMaterial,
                0 // mass

            );
            ground.rotation.x = Math.PI / -2;
            ground.receiveShadow = true;
            _3DView.models.scene.add( ground );
            setUPLights();

            _3DView.renderer.camera.position.x = 800;
            _3DView.renderer.camera.position.y = 120;
            _3DView.renderer.camera.position.z = 800;
            createShape();
            _3DView.animate();
            _3DView.models.scene.simulate();
        };

        getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

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
            return TERRAINGEN.Get( parameters );

        }
        function setUPLights() {
            _3DView.models.lights['mainLight'] = new THREE.DirectionalLight(0xffffff, 0.6);
            _3DView.models.lights['mainLight'].position.set(0, 20, 0);
            _3DView.models.scene.add(_3DView.models.lights['mainLight']);
        }

        function getheight (ground_geometry,x,z){
            var range =10;
            for ( var i = 0; i < ground_geometry.vertices.length; i++ ) {
                var vertex = ground_geometry.vertices[i];
                if((between(x,vertex.x-range,vertex.x+range)) && (between(z,vertex.y-range,vertex.y+range))){
                    return vertex.z;
                }
            }
            return 0;
        }


        $("#playbtn").click(function (event) {
            _3DView.play = !_3DView.play;
            if (_3DView.play) {
              $("#playbtn").html('Puase');
            } else {
              $("#playbtn").html('Play');
            }
        });
        function between(x, min, max) {
            return x >= min && x <= max;
        }


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

        createShape = (function() {
            var addshapes = true,
                shapes = 0,
                box_geometry = new THREE.CubeGeometry( 3, 3, 3 ),
                sphere_geometry = new THREE.SphereGeometry( 1.5, 32, 32 ),
                cylinder_geometry = new THREE.CylinderGeometry( 2, 2, 1, 32 ),
                cone_geometry = new THREE.CylinderGeometry( 0, 2, 4, 32 ),
                octahedron_geometry = new THREE.OctahedronGeometry( 1.7, 1 ),
                torus_geometry = new THREE.TorusKnotGeometry ( 1.7, .2, 32, 4 ),
                doCreateShape;

            setTimeout(
                function addListener() {
                    var button = document.getElementById( 'stop' );
                    if ( button ) {
                        button.addEventListener( 'click', function() { addshapes = false; } );
                    } else {
                        setTimeout( addListener );
                    }
                }
            );

            doCreateShape = function() {
                var shape, material = new THREE.MeshLambertMaterial({ opacity: 1, transparent: true });

                switch ( Math.floor(Math.random() * 2) ) {
                    case 0:
                        shape = new Physijs.BoxMesh(
                            box_geometry,
                            material
                        );
                        break;

                    case 1:
                        shape = new Physijs.SphereMesh(
                            sphere_geometry,
                            material,
                            undefined,
                            { restitution: Math.random() * 1.5 }
                        );
                        break;
                }

                shape.material.color.setRGB( Math.random() * 100 / 100, Math.random() * 100 / 100, Math.random() * 100 / 100 );
                shape.castShadow = true;
                shape.receiveShadow = true;

                shape.position.set(
                    Math.random() * 30 - 15,
                    400,
                    Math.random() * 30 - 15
                );

                shape.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                );

                shape.scale.set(10,10,10);
                if ( addshapes ) {
                    shape.addEventListener( 'ready', createShape );
                }
                _3DView.renderer.scene.add( shape );

                // new TWEEN.Tween(shape.material).to({opacity: 1}, 500).start();

                $scope.pageName = (++shapes) + ' shapes created';
            };

            return function() {
                setTimeout( doCreateShape, 250 );
            };
        })();
        init();
    });
