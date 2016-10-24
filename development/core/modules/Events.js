(function(COMPONENTS) {

    var EVENTS = {
        DOCUMENT_READY: "DOCUMENT_READY",
        WINDOW_RESIZED: "WINDOW_RESIZED",
        WINDOW_SCROLLED: "WINDOW_SCROLLED",
        COMPONENTS_COLLECTED: "COMPONENTS_COLLECTED"
    };

    var Events = new COMPONENTS.Core.EventBus();

    // when all dom content is loaded
    document.addEventListener("DOMContentLoaded", function(event) {
        Events.dispatch(EVENTS.DOCUMENT_READY, this);
        COMPONENTS.Core.Log(EVENTS.DOCUMENT_READY);
    });

    // when the window is resized
    window.addEventListener("resize", COMPONENTS.Core.Util.debounce(function() {
        Events.dispatch(EVENTS.WINDOW_RESIZED, this);
        COMPONENTS.Core.Log(EVENTS.WINDOW_RESIZED);
    }, 250), true);
    
    // when the window is scrolled
    window.addEventListener("scroll", COMPONENTS.Core.Util.debounce(function() {
        Events.dispatch(EVENTS.WINDOW_SCROLLED, this);
        COMPONENTS.Core.Log(EVENTS.WINDOW_SCROLLED);
    }, 250), true);

    COMPONENTS.Core.EVENTS = EVENTS;
    COMPONENTS.Core.Events = Events;
    return COMPONENTS;

})(oem.Components);