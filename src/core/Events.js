ToolhouseUI.Core = (function(Core){

    var $ = Core.Dom;
    $document = $(document);
    $window = $(window);

    var EVENTS = {
        "DOCUMENT_READY":"DOCUMENT_READY",
        "WINDOW_RESIZED":"WINDOW_RESIZED",
        "WINDOW_SCROLL":"WINDOW_SCROLL"
    };

    var Events = new ToolhouseUI.Core.EventBus();

    $document.on('DOMContentLoaded', function() { 
        Events.dispatch(EVENTS.DOCUMENT_READY, this);
        Core.Log(EVENTS.DOCUMENT_READY);
    });

    $window.on('resize', Core.Debounce(function() { 
        Events.dispatch(EVENTS.WINDOW_RESIZED, this);
        Core.Log(EVENTS.WINDOW_RESIZED);
    }, 250));

    $window.on('scroll', Core.Debounce(function() { 
        Events.dispatch(EVENTS.WINDOW_SCROLL, this);
        Core.Log(EVENTS.WINDOW_SCROLL);
    }, 250));

    Core.EVENTS = EVENTS;
    Core.Events = Events;
    return Core;

})(ToolhouseUI.Core || {}, ToolhouseUI.Core.Dom);