ToolhouseUI.Components = (function(Components, Core) {
    Core.Collector.addComponent('custom-comp', Components.CustomComp);
    return Components;
})(ToolhouseUI.Components || {}, ToolhouseUI.Core);
