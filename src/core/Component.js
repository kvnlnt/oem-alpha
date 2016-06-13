oem.Core = (function(Core) {

    var Component = {};
    Component.el = null;
    Component.type = "Component";
    Component.selector = "selector";
    Component.breakpoints = Core.Responsifier.BREAKPOINTS;

    Component.init = function(){
        // Core.Log(this.name + " initialized");
    };

    Component.getEl = function(){
        return this.el;
    };

    Component.setEl = function(el){
        this.el = el;
        return this;
    };

    Component.getSelector = function(){
        return this.selector;
    };

    Component.setSelector = function(selector){
        this.selector = selector;
        return this;
    };

    Component.getType = function(){
        return this.type;
    };

    Component.setType = function(type){
        this.type = type;
        return this;
    };

    Component.getBreakpoints = function(){
        return this.breakpoints;
    };

    Component.setBreakpoints = function(breakpoints){
        this.breakpoints = breakpoints;
        return this;
    };

    Core.Component = Component;
    return Core;
    

})(oem.Core || {});

