(function(COMPONENTS) {

    // Card component
    var AutoInitializer = {};

    /**
     * Collect a component
     *
     * @method     collect
     * @param      {string}     selector   - base selector text
     * @param      {Component}  component  - Object of compoent
     */
    AutoInitializer.collect = function(component) {

        // we only initialize components with a Prototype object
        if(!component.Prototype) return false;

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
    AutoInitializer.collectAll = function(components) {

        for (var component in components) {
            component = components[component];
            AutoInitializer.collect(component);
        }

        // go tell it on the mountain
        COMPONENTS.Core.Events.dispatch(COMPONENTS.Core.EVENTS.COMPONENTS_COLLECTED, this);

        return this;
    };

    AutoInitializer.initializeAll = function(){
        for(var component in oem.list.all){
            oem.read(component).init();
        }
    };

    // collect on document ready
    COMPONENTS.Core.Events.addEventListener(COMPONENTS.Core.EVENTS.DOCUMENT_READY, function(){
        AutoInitializer.collectAll(oem.Components).initializeAll();
    });

    // exports
    COMPONENTS.Core.AutoInitializer = AutoInitializer;
    return COMPONENTS;

})(oem.Components);