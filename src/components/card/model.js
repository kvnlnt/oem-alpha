oem.Components = (function(Components, Core) {

    var CardModel = {};

    CardModel.test = function(){
        return 'test';
    };

    Components.CardModel = CardModel;
    return Components;

})(oem.Components || {}, oem.Core);