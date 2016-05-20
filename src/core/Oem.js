oem = (function(Oem) {

    /**
     * Create component
     */
    Oem.create = function(proto, settings){

        // default settins
        var settings = settings || {};

        // convert the settings object to a valid Object.create propertiesObject
         var propertiesObject = {};
         for(var setting in settings){
            propertiesObject[setting] = {
                value: settings[setting]
            };
         }
        
        // create instance of component
        var componentInstance = Object.create(proto, propertiesObject);

        // attach instance to element
        return componentInstance;
        
    };

    /**
     * Read component
     *
     * @param      {<type>}  component  The component
     */
    Oem.read = function(component){};

    /**
     * Update component
     *
     * @param      {<type>}  component  The component
     * @param      {<type>}  settings   The settings
     */
    Oem.update = function(component, settings){};

    /**
     * Delete component
     */
    Oem.delete = function(component){};

    /**
     * List all components
     */
    Oem.list = function(){};

    /**
     * Return main oem namespace object
     */
    return Oem;
    
})(oem);