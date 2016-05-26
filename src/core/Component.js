oem.Core = (function(Core) {

    var Component = {};
    Component.el = null;
    Component.name = "Component";
    Component.selector = "selector";
    Component.gfx = {};
    Component.css = [];
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

    Component.getName = function(){
        return this.name;
    };

    Component.setName = function(name){
        this.name = name;
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

