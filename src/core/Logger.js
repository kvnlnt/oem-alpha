oem.Core = (function(Core){

    function Log() {
        // logging enabled by the presence of the "logging" url parameter
        if(!Core.Util.getUrlVars().logging) return false;
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