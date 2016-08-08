(function(Core) {

    // Card component
    var AutoInitializer = {};

    /**
     * Collect a component
     *
     * @method     collect
     * @param      {string}     selector   - base selector text
     * @param      {Component}  component  - Object of compoent
     */
    AutoInitializer.initialize = function(component) {

        // init vars
        var selector = '[data-oem="'+component.Prototype.type+'"]';
        var el;

        // find all components
        // create and store instances of each
        _components = document.querySelectorAll(selector);
        for (var i = 0; i < _components.length; i++) {
            el = _components[i];
            oem.create(component.Prototype, {el:el});
        }

    };

    /**
     * Collect all registered components
     *
     * @method     collectAll
     */
    AutoInitializer.initializeAll = function(components) {

        for (var component in components) {
            component = components[component];
            AutoInitializer.initialize(component);
        }

        // go tell it on the mountain
        Core.Modules.Events.dispatch(Core.Modules.EVENTS.COMPONENTS_COLLECTED, this);
    };

    // collect on document ready
    Core.Modules.Events.addEventListener(Core.Modules.EVENTS.DOCUMENT_READY, function(){
        AutoInitializer.initializeAll(oem.Components);
    });

    // exports
    Core.Modules.AutoInitializer = AutoInitializer;
    return Core;

})(oem.Core);