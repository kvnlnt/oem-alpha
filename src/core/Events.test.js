oem.Core = (function(Components, Core) {

    // Events component
    var EventsTest = Object.create(Core.Test); // call super constructor
    EventsTest.name = "EventsTests";
    EventsTest.testComponent = 'oem-core-events-test';
    var component = Object.create(Core.Events);
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
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, function(){
        EventsTest.runTestSuite('Events', [
            EventsTest.sanity
        ]);
    });

    // exports
    Components.EventsTest = EventsTest;
    return Components;

})(oem.Components || {}, oem.Core);