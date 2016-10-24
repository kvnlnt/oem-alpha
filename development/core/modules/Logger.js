(function(COMPONENTS){

    function Log() {
        // logging enabled by the presence of the "logging" url parameter
        if(!COMPONENTS.Core.Util.getUrlVars().logging) return false;
        try {
            console.log.apply(console, arguments);
        } catch(err){
            // alert(err);
            // noop
        }
    };

    COMPONENTS.Core.Log = Log;
    return COMPONENTS;

})(oem.Components);