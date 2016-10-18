(function(Components, Core) {

    // Events component
    var EventsTest = Object.create(Core.Modules.Test); // call super constructor
    EventsTest.name = "EventsTests";
    EventsTest.testComponent = 'oem-core-events-test';
    var component = Object.create(Core.Modules.Events);
    component.name = "TestEvents";

    // event driven architecture is very difficult to test, do basic existential checks here
    EventsTest.sanity = function(){
        var test = typeof document.addEventListener === "function";
        EventsTest.assert('supports document addEventListener', test, true);
        var test = typeof window.addEventListener === "function";
        EventsTest.assert('supports window addEventListener', test, true);
        var test = typeof window.onresize === "object";
        EventsTest.assert('supports window resize event', test, true);
        var test = typeof window.onscroll === "object";
        EventsTest.assert('supports window scroll event', test, true);
    };

    /**
     * Run tests
     */
    Core.Modules.Events.addEventListener(Core.Modules.EVENTS.DOCUMENT_READY, function(){
        EventsTest.runTestSuite('Events', [
            EventsTest.sanity
        ]);
    });

    // exports
    Core.Modules.EventsTest = EventsTest;
    return Core;

})(oem.Components, oem.Core);