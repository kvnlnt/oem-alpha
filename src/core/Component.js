ToolhouseUI.Core = (function(Core) {

    var Component = {};
    Component.name = "Component";
    Component.breakpoints = Core.Responsifier.BREAKPOINTS;

    Component.init = function(){
        Core.Responsifier.addComponent(this);
    };

    Component.getName = function(){
        return this.name;
    };

    Component.setName = function(name){
        this.name = name;
        return this.name;
    };

    Component.getBreakpoints = function(){
        return this.breakpoints;
    };

    Component.setBreakpoints = function(breakpoints){
        this.breakpoints = breakpoints;
        return this.breakpoints;
    };

    Core.Component = Component;
    return Core;
    

})(ToolhouseUI.Core || {});

