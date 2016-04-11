ToolhouseUI.Components = (function(Components, Core) {

    var Logic = {};

    Logic.test = function(){
        return 'test';
    };

    Components.CardLogic = Logic;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);