ToolhouseUI.Components = (function(Core, Collections) {

    // Card component
    var Collector = {};
    Collector.components = [];

    /**
     * Add component to collection
     *
     * @method     addComponent
     * @param      {string}     selector   - string of base selector
     * @param      {Component}  component  - Object component
     * @return     {Object}     return self
     */
    Collector.addComponent = function(selector, component) {
        Collector.components.push({
            selector: selector,
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
    Collector.collect = function(selector, component) {

        // init vars
        var cssSelector = "." + selector;
        var tagSelector = selector;
        var el;

        // create collection of this selector type
        if (typeof Collections[selector] === "undefined") Collections[selector] = [];

        // find all components
        // create and store instances of each
        _components = document.querySelectorAll(cssSelector + "," + tagSelector);
        for (var i = 0; i < _components.length; i++) {
            el = _components[i];
            var instance = Object.create(component, {
                el: {
                    value: el
                }
            });
            instance.init();
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
    Collector.collectAll = function() {
        var component;
        for (var i = 0; i < Collector.components.length; i++) {
            component = Collector.components[i];
            Collector.collect(component.selector, component.component);
        }
    };

    // collect on document ready
    Core.Events.addEventListener(Core.EVENTS.DOCUMENT_READY, Collector.collectAll);

    // exports
    Core.Collector = Collector;
    return Core;

})(ToolhouseUI.Core, ToolhouseUI.Collections);