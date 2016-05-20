
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
        var componentInstance = Object.create(proto, propertiesObject);

        // add to collector
        // XXX might nobe be the best spot, but where else?
        oem.Core.AutoInitializer.addComponent(componentInstance);

        // attach instance to element
        return componentInstance;

    };

    Core.Prototype = Prototype;
    return Core;

})(oem.Core || {});