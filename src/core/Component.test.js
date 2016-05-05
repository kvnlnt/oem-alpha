oem.Core = (function(Components, Core) {

    // Component component
    var ComponentTest = Object.create(Core.Test); // call super constructor
    ComponentTest.name = "ComponentTests";
    ComponentTest.testComponent = 'oem-core-component-test';
    var component = Object.create(Core.Component);
    component.name = "TestComponent";

    ComponentTest.canGetAndSetName = function(){
        component.setName("TestComponentChanged");
        var test = component.getName() === "TestComponentChanged";
        ComponentTest.assert('Can get and set the name', test, true);
    };

    ComponentTest.canGetAndSetElements = function(){
        var el = document.createElement("div");
        el.classList.add('random-el');
        component.setEl(el);
        var test = component.getEl().classList.contains('random-el');
        ComponentTest.assert('Can get and set the element', test, true);
    };

    ComponentTest.canGetAndSetBreakpoints = function(){
        component.setBreakpoints('blah-blah-blah');
        var test = component.getBreakpoints() === 'blah-blah-blah';
        ComponentTest.assert('Can get and set breakpoints', test, true);
    };  

    /**
     * Run tests
     */
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        ComponentTest.runTestSuite('Component', [
            ComponentTest.canGetAndSetName,
            ComponentTest.canGetAndSetElements,
            ComponentTest.canGetAndSetBreakpoints
        ]);
    });

    // exports
    Components.ComponentTest = ComponentTest;
    return Components;

})(oem.Components || {}, oem.Core);