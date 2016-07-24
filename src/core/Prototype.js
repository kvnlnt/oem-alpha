oem.Core = (function(Core) { 

    function Prototype(proto, settings) {

        // default settins
        var settings = settings || {};

        // loop and collect Object.create overwrite settings
        // only applies to pre-existing properties on prototype
        var propertiesObject = {};

        for (var setting in settings) {
            if(proto.hasOwnProperty(setting)){
                propertiesObject[setting] = {
                    value: settings[setting]
                };
            }
        }

        // create Object of component and apply overwrite object (propertiesObject)
        var componentObject = Object.create(proto, propertiesObject);

        // attach any settings not in prototype (because they won't be applied in the propertiesObject)
        for (var setting in settings) {
            if(proto.hasOwnProperty(setting) === false){
                componentObject[setting] = settings[setting];
            }
        }

        // attach instance to element
        return componentObject;

    };

    Core.Prototype = Prototype;
    return Core;

})(oem.Core || {});