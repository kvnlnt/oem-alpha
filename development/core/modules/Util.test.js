(function(CORE) {

    // Util component
    var UtilTest = Object.create(CORE.Test); // call super constructor
    UtilTest.testComponent = 'UtilTest';
    var component = Object.create(CORE.Util);
    component.name = "UtilTest";

    // event driven architecture is very difficult to test, do basic existential checks here
    UtilTest.canMixinObjects = function(){
        var destination = {};
        var source = { test: "test" };
        var test = CORE.Util.mixin(destination, source).hasOwnProperty('test');
        UtilTest.assert('can mixin objects', test, true);
    };

    UtilTest.canDebounce = function(){
        var test = false;
        function changeVal(){ 
            test = true; 
        }
        CORE.Util.debounce(changeVal, 10, true);
        changeVal();
        setTimeout(function(){
            if(test){
                UtilTest.assert('can debounce functions', true, true);
            } else {
                UtilTest.assert('can debounce functions', false, true);
            }
        }, 20);
        
    };

    UtilTest.canParseStringToObject = function(){
        var obj = CORE.Util.parseStringToObject("len:6, val:'test'");
        var test = obj.len === 6;
        console.log(test, obj.len);
        UtilTest.assert('can parse strings to objects', test, true);
    };

    UtilTest.canGenerateGuid = function(){
        var guid = CORE.Util.guid();
        var otherGuid = CORE.Util.guid();
        var test1 = (guid.match(new RegExp("-", "g")) || []).length === 4;
        var test2 = guid.length > 16;
        var test3 = guid != otherGuid;
        var test = test1 && test2 && test3;
        UtilTest.assert('can generate propery guid', test, true);

    };

    /**
     * Run tests
     */
    CORE.Events.addEventListener(CORE.EVENTS.DOCUMENT_READY, function(){
        UtilTest.runTestSuite('Util', [
            UtilTest.canMixinObjects,
            UtilTest.canDebounce,
            UtilTest.canParseStringToObject,
            UtilTest.canGenerateGuid
        ]);
    });

    // exports
    CORE.UtilTest = UtilTest;
    return CORE;

})(oem.Core);