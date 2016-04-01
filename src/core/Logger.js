ToolhouseUI.Core = (function(Core){

    function Log() {
        if(console){
            console.log.apply(console, arguments);
        }
    };

    Core.Log = Log;
    return Core;

})(ToolhouseUI.Core || {});