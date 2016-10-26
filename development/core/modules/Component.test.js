(function(CORE) {

    // Component component
    var ComponentTest = Object.create(CORE.Test); // call super constructor
    ComponentTest.name = "ComponentTests";
    ComponentTest.testComponent = 'ComponentTest';
    var component = Object.create(CORE.Component);
    component.name = "ComponentTest";

    ComponentTest.canGetAndSetType = function(){
        component.setType("TestComponentChanged");
        var test = component.getType() === "TestComponentChanged";
        ComponentTest.assert('Can get and set the type', test, true);
    };

    ComponentTest.canGetAndSetElements = function(){
        var el = document.createElement("div");
        el.classList.add('random-el');
        component.setEl(el);
        var test = component.getEl().classList.contains('random-el');
        ComponentTest.assert('Can get and set the element', test, true);
    };

    /**
     * Run tests
     */
    CORE.Events.addEventListener(CORE.EVENTS.DOCUMENT_READY, function(){
        ComponentTest.runTestSuite('Component', [
            ComponentTest.canGetAndSetType,
            ComponentTest.canGetAndSetElements
        ]);
    });

    // exports
    CORE.ComponentTest = ComponentTest;
    return CORE;

})(oem.Core);