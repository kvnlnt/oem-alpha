oem = (function (Oem) {

    /**
     * Create component
     */
    Oem.create = function (component, elOrOptions) {
        // if there's no DOM element, programmatically create one
        // with all the settings provided, if it's a DOM element
        // pass that along to the init function
        // var isDomElement = elOrOptions.nodeType === 1; // crossbrowser way to detect DOM element IE8+
        component.init(elOrOptions);
        return component;
    };

    /**
     * Read component
     *
     * @param      {<type>}  component  The component
     */
    Oem.read = function (component) {};

    /**
     * Update component
     *
     * @param      {<type>}  component  The component
     * @param      {<type>}  settings   The settings
     */
    Oem.update = function (component, settings) {};

    /**
     * Delete component
     */
    Oem.delete = function (component) {};

    /**
     * List all components
     */
    Oem.list = function () {};

    /**
     * Return main oem namespace object
     */
    return Oem;

})(oem);