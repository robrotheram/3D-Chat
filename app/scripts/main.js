/** @namespace */
require.config({
  baseUrl: "scripts",
  paths: {
    "jquery": "vendor/jquery/dist/jquery.min",
    "jquery-ui": "vendor/jquery-ui/jquery-ui.min",
    "jquery-ui-touch": "vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min",
    "bootstrap": "vendor/bootstrap/dist/js/bootstrap.min",
    "angular": "vendor/angular/angular.min",
    "angular-route": "vendor/angular-route/angular-route.min",
    "angularAMD": "vendor/angularAMD/angularAMD.min",

    "three": "vendor/threejs/build/three.min",
    "three-controls": "vendor/three.js-controls/src/TrackballControls",
    "three-tgaloader": "3DView/tgaloader"
  },
  shim: {
    "jquery-ui": {
      deps: ["jquery"],
      exports: "$"
    },
    "jquery-ui-touch": {
      exports: "$",
      deps: ['jquery-ui']
    },
    'angularAMD': ['angular'],
    'angular-route': ['angular'],

    "bootstrap": {
      deps: ["jquery"]
    },

    "three": {exports: 'THREE'},
    "three-controls": {deps: ['three'], exports: 'THREE'},
    "three-tgaloader": {deps: ['three'], exports: 'THREE'}
  },
  deps: ['app']
// End of shims
});




