oem.Core = (function(Components, Core) {

    // Util component
    var UtilTest = Object.create(Core.Test); // call super constructor
    UtilTest.name = "UtilTests";
    UtilTest.testComponent = 'oem-core-util-test';
    var component = Object.create(Core.Util);
    component.name = "TestUtil";

    // event driven architecture is very difficult to test, do basic existential checks here
    UtilTest.canExtendObjects = function(){
        var destination = {};
        var source = { test: "test" };
        var test = Core.Util.extend(destination, source).hasOwnProperty('test');
        UtilTest.assert('can extend objects', test, true);
    };

    UtilTest.canTypeCheckJavascript = function(){
        var test = Core.Util.type('string') === 'string';
        UtilTest.assert('can typecheck strings', test, true);
        var test = Core.Util.type(0) === 'number';
        UtilTest.assert('can typecheck numbers', test, true);
        var test = Core.Util.type({}) === 'object';
        UtilTest.assert('can typecheck objects', test, true);
        var test = Core.Util.type(function(){}) === 'function';
        UtilTest.assert('can typecheck functions', test, true);
        var test = Core.Util.type(true) === 'boolean';
        UtilTest.assert('can typecheck booleans', test, true);
        var test = Core.Util.type(undefined) === 'undefined';
        UtilTest.assert('can typecheck undefined', test, true);
        var test = Core.Util.type(null) === 'null';
        UtilTest.assert('can typecheck null', test, true);
    };

    UtilTest.canDebounce = function(){
        var test = false;
        function changeVal(){ 
            test = true; 
        }
        Core.Util.debounce(changeVal, 10, true);
        changeVal();
        setTimeout(function(){
            if(test){
                UtilTest.assert('can debounce functions', true, true);
            } else {
                UtilTest.assert('can debounce functions', false, true);
            }
        }, 20);
        
    };

    /**
     * Run tests
     */
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        UtilTest.runTestSuite('Util', [
            UtilTest.canExtendObjects,
            UtilTest.canTypeCheckJavascript,
            UtilTest.canDebounce
        ]);
    });

    // exports
    Components.UtilTest = UtilTest;
    return Components;

})(oem.Components || {}, oem.Core);