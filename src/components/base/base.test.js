ToolhouseUI.Components = (function(Components, Core) {

    const BaseTest = {};
    BaseTest.type = Core.Component.TYPE.test;
    Components.BaseTest = BaseTest;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);