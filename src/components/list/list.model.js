oem.Components = (function(Components, Core) {

    var ListModel = {};

    ListModel.test = function(){
        return 'test';
    };

    Components.ListModel = ListModel;
    return Components;

})(oem.Components || {}, oem.Core);