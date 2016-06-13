oem = (function (Oem, Core) {

    Oem.version = 1;

    /**
     * List all components
     */
    Oem.list = {
        all:{},
        byType: function (componentType) {
            var components = {};
            var component;
            for(var i in Oem.list.all){
                component = Oem.list.all[i];
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
     */
    Oem.create = function (component, options) {
        // this is a creational mediator pattern which calls the root prototype
        // and creates' an instance
        var component = Core.Prototype(component, options);
        var guid = Core.Util.guid();
        component.init();
        component.id = guid;
        component.el.oem = component; // attach pointer to instance on element
        oem.list.all[guid] = component;
        return component;
    };

    /**
     * Read and find components
     *
     * @param      {<type>}  component  The component
     */
    Oem.read = function (componentId) {
        return oem.list.all[componentId];
    };

    /**
     * Update component
     *
     * @param      {<type>}  component  The component
     * @param      {<type>}  settings   The settings
     */
    Oem.update = function (componentId, settings) {
        return component;
    };

    /**
     * Delete component instance and element from dom
     */
    Oem.destroy = function (componentId) {
        var component = Oem.read(componentId);
        var node = component.getEl();
        if (node.parentNode) node.parentNode.removeChild(node);
        delete oem.list.all[componentId];
        return this;
    };

    /**
     * Return main oem namespace object
     */
    return Oem;

})(oem, oem.Core || {});