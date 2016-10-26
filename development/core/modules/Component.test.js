(function(CORE) {

    // Component component
    var ComponentTest = Object.create(CORE.Test); // call super constructor
    ComponentTest.testComponent = 'ComponentTest';
    var component = Object.create(CORE.Component);
    component.name = "ComponentTest";

    ComponentTest.canGetAndSetId = function(){
        component.setId("TestComponentChanged");
        var test = component.getId() === "TestComponentChanged";
        ComponentTest.assert('Can get and set the id', test, true);
    };

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

    ComponentTest.canGetAndSetEvents = function(){
        component.setEvents({ testEvent:"testEvent" });
        var test = component.getEvents().testEvent === "testEvent";
        ComponentTest.assert('Can get and set events', test, true);
    };

    /**
     * Run tests
     */
    CORE.Events.addEventListener(CORE.EVENTS.DOCUMENT_READY, function(){
        ComponentTest.runTestSuite('Component', [
            ComponentTest.canGetAndSetId,
            ComponentTest.canGetAndSetType,
            ComponentTest.canGetAndSetElements,
            ComponentTest.canGetAndSetEvents
        ]);
    });

    // exports
    CORE.ComponentTest = ComponentTest;
    return CORE;

})(oem.Core);