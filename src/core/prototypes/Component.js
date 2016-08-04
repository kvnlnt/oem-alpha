(function(Core) {

    var Component = {};
    Component.el = null;
    Component.id = null;
    Component.type = "Component";
    Component.selector = "selector";
    Component.breakpoints = Core.Modules.Responsifier.BREAKPOINTS;
    Component.events = {};

    Component.init = function(){
        // overwrite in component prototype
    };

    // GETTERS

    Component.getId = function(){
        return this.id;
    };

    Component.getEl = function(){
        return this.el;
    };

    Component.getSelector = function(){
        return this.selector;
    };

    Component.getType = function(){
        return this.type;
    };

    Component.getBreakpoints = function(){
        return this.breakpoints;
    };

    Component.getEvents = function(){
        return this.events;
    };

    // SETTERS

    Component.setType = function(type){
        this.type = type;
        return this;
    };

    Component.setSelector = function(selector){
        this.selector = selector;
        return this;
    };

    Component.setEl = function(el){
        this.el = el;
        return this;
    };

    Component.setId = function(id){
        this.getEl().id = id;
        this.id = id;
        return this;
    };

    Component.setBreakpoints = function(breakpoints){
        this.breakpoints = breakpoints;
        return this;
    };

    Component.setEvents = function(events){
        this.events = events;
        return this;
    };

    Core.Prototypes.Component = Component;
    return Core;
    

})(oem.Core);

