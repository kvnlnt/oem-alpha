ToolhouseUI.Components = (function(Components, Core) {

    var KevinModel = {};

    KevinModel.test = function(){
        return 'test';
    };

    Components.KevinModel = KevinModel;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);