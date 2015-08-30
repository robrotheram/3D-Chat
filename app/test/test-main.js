/* app/test/test-main.js */


var tests = [];
for (var file in window.__karma__.files) {
  if (/spec\.js$/.test(file)) {
    tests.push(file);
  }
}
console.log(tests);


require.config({
  baseUrl: 'base/MENG/app/scripts',
  deps: ['/base/MENG/app/test/spec/app.js','/base/MENG/app/test/spec/_3DView.js'],
  callback: window.__karma__.start,
  paths: {
    "angular": "vendor/angular/angular",
    "angularMocks": 'vendor/angular-mocks/angular-mocks',
    "angular-route": 'vendor/angular-route/angular-route',
    "angularAMD": "vendor/angularAMD/angularAMD",
    "jquery": "vendor/jquery/dist/jquery",
    "jquery-ui": "vendor/jquery-ui/jquery-ui",
    "jquery-ui-touch": "vendor/jqueryui-touch-punch/jquery.ui.touch-punch",
    "bootstrap": "vendor/bootstrap/dist/js/bootstrap",
    "three": "vendor/threejs/build/three",
    "three-controls": "vendor/three.js-controls/src/TrackballControls",
    "three-tgaloader": "3DView/tgaloader"

  },
  shim: {

    'angular': { exports: 'angular' },
    'angularAMD': ['angular'],
    'angular-route': ['angular'],
    'angularMocks': { deps: ['angular'] },
    "jquery-ui": {
      deps: ["jquery"],
      exports: "$"
    },
    "jquery-ui-touch": {
      exports: "$",
      deps: ['jquery-ui']
    },
    "bootstrap": {
      deps: ["jquery"]
    },

    "three": {exports: 'THREE'},
    "three-controls": {deps: ['three'], exports: 'THREE'},
    "three-tgaloader": {deps: ['three'], exports: 'THREE'}

  }

});



