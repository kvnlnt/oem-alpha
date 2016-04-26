ToolhouseUI.Components = (function(Components, Core) {

    var %CLASS%Model = {};

    %CLASS%Model.test = function(){
        return 'test';
    };

    Components.%CLASS%Model = %CLASS%Model;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);