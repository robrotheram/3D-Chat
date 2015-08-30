/**
 * Created by robertfletcher on 28/04/15.
 */

console.log("hello"+document.location);


define(['angular','angularMocks',"app", "jquery", "jquery-ui", "jquery-ui-touch", '3DView/3DView', 'bootstrap', 'three'],
  function(angular, angularMocks,app,$) {
    describe('new', function() {

      it('works for new', function() {
        _3DView.new();
        var x = 55;
        expect(x).toEqual(55);

      });


    });

    describe('init', function() {

      it('works for new', function() {

        _3DView.init($('#jet'));
        var x = 55;
        expect(x).toEqual(55);

      });


    });

    describe('load', function() {

      it('works for new', function() {
        _3DView.load();

        var x = 55;
        expect(x).toEqual(55);

      });


    });

    describe('reset', function() {

      it('works for new', function() {
        _3DView.reset();

        var x = 55;
        expect(x).toEqual(55);

      });


    });

    describe('onSelectPart', function() {

      it('works for new', function() {
        var event = new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': true,
        });

        var el = $('<div id="jet" style="width:500px;height:300px;">');
        $(document.body).append(el);

        _3DView.init("#jet");
        _3DView.onSelectPart(event);
        var x = 55;
        expect(x).toEqual(55);

      });


    });

    describe('onSelectPart With Models', function() {

      it('works for new', function() {
        var event = new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': true,
        });

        var el = $('<div id="jet" style="width:500px;height:300px;">');
        $(document.body).append(el);

        _3DView.init("#jet");



        loadModel("test/Spec/body.json");
        function loadModel(filename) {
          _3DView.models.loader.load(filename, _3DView.models.meshloader(filename));
        }


        _3DView.onSelectPart(event);
        var x = 55;
        expect(x).toEqual(55);

      });
    });

  }
);
