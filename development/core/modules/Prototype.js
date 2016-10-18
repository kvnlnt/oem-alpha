(function(Core) { 

    function Prototype(proto, settings) {

        // default settins
        var settings = settings || {};

        // loop and collect Object.create overwrite settings
        // only applies to pre-existing properties on prototype
        var propertiesObject = {};

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

    Core.Modules.Prototype = Prototype;
    return Core;

})(oem.Core);