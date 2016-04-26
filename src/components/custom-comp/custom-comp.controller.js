ToolhouseUI.Components = (function(Components, Core) {

    // Card component
    var CustomComp = Object.create(Core.Component); // call super constructor.
    COMPONENT_CLASS.name = "COMPONENT_CLASS";
    Core.Util.extend(COMPONENT_CLASS, Components.COMPONENT_CLASSModel);
    
    // exports
    Components.COMPONENT_CLASS = COMPONENT_CLASS;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);