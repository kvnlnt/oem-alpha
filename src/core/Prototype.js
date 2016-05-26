
oem.Core = (function(Core) { 

    function Prototype(proto, settings) {

        // default settins
        var settings = settings || {};

        // convert the settings object to a valid Object.create propertiesObject
        var propertiesObject = {};
        for (var setting in settings) {
            propertiesObject[setting] = {
                value: settings[setting]
            };
        }

        // create Object of component
        var componentObject = Object.create(proto, propertiesObject);

        // attach instance to element
        return componentObject;

    };

    Core.Prototype = Prototype;
    return Core;

})(oem.Core || {});