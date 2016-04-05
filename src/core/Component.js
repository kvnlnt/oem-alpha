ToolhouseUI.Core = (function(Core) {

    var Component = {};
    Component.el = null;
    Component.name = "Component";
    Component.breakpoints = Core.Responsifier.BREAKPOINTS;

    Component.init = function(){
        Core.Responsifier.addComponent(this);
    };

    Component.getEl = function(){
        return this.el;
    };

    Component.setEl = function(el){
        this.el = el;
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
    

})(ToolhouseUI.Core || {});

