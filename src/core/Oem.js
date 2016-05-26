oem = (function (Oem, Core) {

        // create collection of this selector type
        // if (typeof Collections[selector] === "undefined") Collections[selector] = [];

        // // if this selector has already been collected, reset it
        // // calling collect on a component is the same as "recollecting"
        // if(Collections[selector].length > 0) Collections[selector] = [];

    /**
     * Create component
     */
    Oem.create = function (component, options) {
        // this is a creational mediator pattern which calls the root prototype
        // and creates' an instance
        var component = Core.Prototype(component, options);
        component.init();
        return component;
    };

    /**
     * Read component
     *
     * @param      {<type>}  component  The component
     */
    Oem.read = function (component) {
        return component;
    };

    /**
     * Update component
     *
     * @param      {<type>}  component  The component
     * @param      {<type>}  settings   The settings
     */
    Oem.update = function (component, settings) {
        return component;
    };

    /**
     * Delete component
     */
    Oem.destroy = function (component) {
        return component;
    };

    /**
     * List all components
     */
    Oem.list = function () {
        return component;
    };

    /**
     * Return main oem namespace object
     */
    return Oem;

})(oem, oem.Core || {});