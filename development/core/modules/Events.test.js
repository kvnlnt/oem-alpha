(function(CORE) {

    // Events component
    var EventsTest = Object.create(CORE.Test); // call super constructor
    EventsTest.testComponent = 'EventTest';
    var component = Object.create(CORE.Events);
    component.name = "EventTest";

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
    CORE.Events.addEventListener(CORE.EVENTS.DOCUMENT_READY, function(){
        EventsTest.runTestSuite('Events', [
            EventsTest.sanity
        ]);
    });

    // exports
    CORE.EventsTest = EventsTest;
    return CORE;

})(oem.Core);