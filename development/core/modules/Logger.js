(function(CORE){

    function Log() {
        // logging enabled by the presence of the "logging" url parameter
        if(!CORE.Util.getUrlVars().logging) return false;
        try {
            console.log.apply(console, arguments);
        } catch(err){
            // alert(err);
            // noop
        }
    };

    CORE.Log = Log;
    return CORE;

})(oem.Core);