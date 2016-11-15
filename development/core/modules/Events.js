(function(CORE) {

    var EVENTS = {
        DOCUMENT_READY: "DOCUMENT_READY",
        WINDOW_RESIZED: "WINDOW_RESIZED",
        WINDOW_SCROLLED: "WINDOW_SCROLLED",
        COMPONENTS_INITIALIZED: "COMPONENTS_INITIALIZED"
    };

    var Events = new CORE.EventBus();

    // when all dom content is loaded
    document.addEventListener("DOMContentLoaded", function(event) {
        Events.dispatch(EVENTS.DOCUMENT_READY, this);
        CORE.Log(EVENTS.DOCUMENT_READY);
    });

    // when the window is resized
    window.addEventListener("resize", CORE.Util.debounce(function() {
        Events.dispatch(EVENTS.WINDOW_RESIZED, this);
        CORE.Log(EVENTS.WINDOW_RESIZED);
    }, 250), true);
    
    // when the window is scrolled
    window.addEventListener("scroll", CORE.Util.debounce(function() {
        Events.dispatch(EVENTS.WINDOW_SCROLLED, this);
        CORE.Log(EVENTS.WINDOW_SCROLLED);
    }, 250), true);

    CORE.EVENTS = EVENTS;
    CORE.Events = Events;
    return CORE;

})(oem.Core);