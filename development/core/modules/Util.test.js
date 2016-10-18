(function(Components, Core) {

    // Util component
    var UtilTest = Object.create(Core.Modules.Test); // call super constructor
    UtilTest.name = "UtilTests";
    UtilTest.testComponent = 'oem-core-util-test';
    var component = Object.create(Core.Modules.Util);
    component.name = "TestUtil";

    // event driven architecture is very difficult to test, do basic existential checks here
    UtilTest.canMixinObjects = function(){
        var destination = {};
        var source = { test: "test" };
        var test = Core.Modules.Util.mixin(destination, source).hasOwnProperty('test');
        UtilTest.assert('can mixin objects', test, true);
    };

    UtilTest.canDebounce = function(){
        var test = false;
        function changeVal(){ 
            test = true; 
        }
        Core.Modules.Util.debounce(changeVal, 10, true);
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
    Core.Modules.Events.addEventListener(Core.Modules.EVENTS.DOCUMENT_READY, function(){
        UtilTest.runTestSuite('Util', [
            UtilTest.canMixinObjects,
            UtilTest.canDebounce
        ]);
    });

    // exports
    Core.Modules.UtilTest = UtilTest;
    return Core;

})(oem.Components, oem.Core);