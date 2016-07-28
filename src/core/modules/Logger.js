(function(Core){

    function Log() {
        // logging enabled by the presence of the "logging" url parameter
        if(!Core.Modules.Util.getUrlVars().logging) return false;
        try {
            console.log.apply(console, arguments);
        } catch(err){
            // alert(err);
            // noop
        }
    };

    Core.Modules.Log = Log;
    return Core;

})(oem.Core);