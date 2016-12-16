(function(CORE) { 

    function Prototype(proto, settings) {

        // default settins
        var settings = settings || {};

        // init properties object
        var propertiesObject = {};

        // apply overwrites
        for (var setting in settings) {
            propertiesObject[setting] = {
                value: settings[setting]
            };
        }

        // create Object of component and apply overwrite object (propertiesObject)
        var componentObject = Object.create(proto, propertiesObject);

        // attach instance to element
        return componentObject;

    };

    CORE.Prototype = Prototype;
    return CORE;

})(oem.Core);