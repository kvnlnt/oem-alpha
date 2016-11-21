/**
 *
 * @module     AutoInitializer
 * @desc       Onload searches the DOM for any instances of components present in oem.Components
 *
 */

(function(CORE) {

    // Card component
    var AutoInitializer = {};

    /**
     * Collect all instances of this component type
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
     * Collect all registered component types
     *
     * @method     collectAll
     */
    AutoInitializer.collectAll = function(components) {

        for (var component in components) {
            component = components[component];
            AutoInitializer.collect(component);
        }

        return this;
    };

    AutoInitializer.initializeAll = function(){
        for(var component in oem.list.all){
            oem.read(component).init();
        }

        // go tell it on the mountain
        oem.events.dispatch(CORE.EVENTS.COMPONENTS_INITIALIZED, this);
    };

    // collect on document ready
    CORE.Events.addEventListener(CORE.EVENTS.DOCUMENT_READY, function(){
        AutoInitializer.collectAll(oem.Components).initializeAll();
    });

    // exports
    CORE.AutoInitializer = AutoInitializer;
    return CORE;

})(oem.Core);