ToolhouseUI.Components = (function(Components, Core) {

    var CardModel = {};

    CardModel.test = function(){
        return 'test';
    };

    Components.CardModel = CardModel;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);