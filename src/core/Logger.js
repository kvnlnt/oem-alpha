oem.Core = (function(Core){

    function Log() {
        try {
            console.log.apply(console, arguments);
        } catch(err){
            // alert(err);
            // noop
        }
    };

    Core.Log = Log;
    return Core;

})(oem.Core || {});