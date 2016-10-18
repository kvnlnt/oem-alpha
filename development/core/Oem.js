// Core oem object
(function (OEM, UTIL, PROTOTYPE, AUTO_INITIALIZER) {

    OEM.version = 1;

    /**
     * List all components
     */
    OEM.list = {
        all:{},
        byType: function (componentType) {
            var components = {};
            var component;
            for(var i in OEM.list.all){
                component = OEM.list.all[i];
                if(component.type === componentType){
                    components[i] = component;
                }
            }
            if (Object.keys(components).length === 0) return null; // return null if none found
            return components;
        }
    };

    /**
     * Create component
     * this is a creational mediator pattern which calls the root prototype
     * and creates' an instance
     */
    OEM.create = function (component, options) {

        // create a new original prototype off the provided component with supplied options
        var createdComponent = PROTOTYPE(component, options);
        createdComponent.setId(options.el.dataset.oemId || UTIL.guid());

        // add component to collection
        oem.list.all[createdComponent.getId()] = createdComponent;

        return createdComponent;
    };

    /**
     * Read and find components
     *
     * @param      {<type>}  component  The component
     */
    OEM.read = function (componentId) {
        return oem.list.all[componentId];
    };

    /**
     * TODO: Update component
     *
     * @param      {<type>}  component  The component
     * @param      {<type>}  settings   The settings
     */
    OEM.update = function (componentId, settings) {
        return component;
    };

    /**
     * Delete component instance and element from DOM
     */
    OEM.destroy = function (componentId) {
        var component = OEM.read(componentId);
        var node = component.getEl();
        if (node.parentNode) node.parentNode.removeChild(node);
        delete oem.list.all[componentId];
        return component;
    };

    /**
     * Mediator to internal initializer
     * @return {[type]} [description]
     */
    OEM.init = function(components){
        var components = components || oem.Components;
        AUTO_INITIALIZER.initializeAll(components);
        return components;
    };

    /**
     * Proxy to internal event bus and enum
     */
    OEM.events = OEM.Core.Modules.Events;
    OEM.EVENTS = OEM.Core.Modules.EVENTS;

    /**
     * Return main oem namespace object
     */
    return OEM;

})(oem, oem.Core.Modules.Util, oem.Core.Modules.Prototype, oem.Core.AutoInitializer);