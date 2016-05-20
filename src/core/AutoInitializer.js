oem.Core = (function(Core, Collections) {

    // Card component
    var AutoInitializer = {};
    AutoInitializer.components = [];

    /**
     * Add component to collection
     *
     * @method     addComponent
     * @param      {string}     selector   - string of base selector
     * @param      {Component}  component  - Object component
     * @return     {Object}     return self
     */
    AutoInitializer.addComponent = function(component) {

        // we only watch components that haven't been added.
        var hasAlreadyBeenAdded = this.components.find(function(_component){
            return _component.selector === component.getSelector();
        });
        if(hasAlreadyBeenAdded) return this;

        // add component if it hasn't been already.
        AutoInitializer.components.push({
            selector: component.getSelector(),
            component: component
        });
        
        return this;
    };

    /**
     * Collect a component
     *
     * @method     collect
     * @param      {string}     selector   - base selector text
     * @param      {Component}  component  - Object of compoent
     */
    AutoInitializer.collect = function(selector, component) {

        // init vars
        var cssSelector = "." + selector;
        var tagSelector = selector;
        var el;

        // create collection of this selector type
        if (typeof Collections[selector] === "undefined") Collections[selector] = [];

        // if this selector has already been collected, reset it
        // calling collect on a component is the same as "recollecting"
        if(Collections[selector].length > 0) Collections[selector] = [];

        // find all components
        // create and store instances of each
        _components = document.querySelectorAll(cssSelector + "," + tagSelector);
        for (var i = 0; i < _components.length; i++) {
            el = _components[i];
            var instance = oem.create(component, { el: el });
            Collections[selector].push(instance);
        }

        // go tell it on the mountain
        Core.Events.dispatch(Core.EVENTS.COMPONENTS_COLLECTED, this);

    };

    /**
     * Collect all registered components
     *
     * @method     collectAll
     */
    AutoInitializer.collectAll = function() {
        var component;
        for (var i = 0; i < AutoInitializer.components.length; i++) {
            component = AutoInitializer.components[i];
            AutoInitializer.collect(component.selector, component.component);
        }
    };

    // collect on document ready
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, AutoInitializer.collectAll);

    // exports
    Core.AutoInitializer = AutoInitializer;
    return Core;

})(oem.Core, oem.Collections);