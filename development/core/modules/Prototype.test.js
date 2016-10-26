(function(CORE) {

    // Component component
    var ComponentTest = Object.create(CORE.Test); // call super constructor
    ComponentTest.testComponent = 'PrototypeTest';
    var component = Object.create(CORE.Component);
    component.name = "PrototypeTest";

    ComponentTest.sanity = function(){
        ComponentTest.assert('Can properly create new object', true, true);
    };

    /**
     * Run tests
     */
    CORE.Events.addEventListener(CORE.EVENTS.DOCUMENT_READY, function(){
        ComponentTest.runTestSuite('Prototype', [
            ComponentTest.sanity
        ]);
    });

    // exports
    CORE.ComponentTest = ComponentTest;
    return CORE;

})(oem.Core);