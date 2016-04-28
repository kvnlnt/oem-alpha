oem.Core = (function(Core){

    function Log() {
        try {
            console.log.apply(console, arguments);
        } catch(err){
            // noop
        }
    };

    Core.Log = Log;
    return Core;

})(oem.Core || {});