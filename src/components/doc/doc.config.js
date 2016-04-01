ToolhouseUI.Components = (function(Components, Core) {

    const DocConfig = {};
    DocConfig.type = Core.Component.TYPE.test;
    Components.DocConfig = DocConfig;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);