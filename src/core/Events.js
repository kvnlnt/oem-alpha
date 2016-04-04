ToolhouseUI.Core = (function(Core) {

    var EVENTS = {
        DOCUMENT_READY: "DOCUMENT_READY",
        WINDOW_RESIZED: "WINDOW_RESIZED",
        WINDOW_SCROLLED: "WINDOW_SCROLLED",
        COMPONENTS_COLLECTED: "COMPONENTS_COLLECTED"
    };

    var Events = new ToolhouseUI.Core.EventBus();

    document.addEventListener("DOMContentLoaded", function(event) {
        Events.dispatch(EVENTS.DOCUMENT_READY, this);
        Core.Log(EVENTS.DOCUMENT_READY);
    });

    window.addEventListener("resize", Core.Debounce(function() {
        Events.dispatch(EVENTS.WINDOW_RESIZED, this);
        Core.Log(EVENTS.WINDOW_RESIZED);
    }, 250), true);
    
    window.addEventListener("scroll", Core.Debounce(function() {
        Events.dispatch(EVENTS.WINDOW_SCROLLED, this);
        Core.Log(EVENTS.WINDOW_SCROLLED);
    }, 250), true);

    Core.EVENTS = EVENTS;
    Core.Events = Events;
    return Core;

})(ToolhouseUI.Core || {});