oem.Components = (function(Components, Core) {

    // Business logic
    var Prototype = Core.Prototype(Core.Component, {
        type: "%CLASS%",
        selector: "%SELECTOR%"
    });

    // DEFAULTS
    // 1. Use this area to set parameters and defaults on the prototype not part of the original Core.Component prototype.
    // 2. Be sure to use getters/setters for each param
    // Prototype.key = val;

    // SETUP
    // 1. Use this area to run setup functions.
    // 2. The init function from the Core.Component prototype will be called automatically. 
    // 3. Sometimes you may want to set things up after an event (ie: COMPONENTS_COLLECTED):
    //      1. register that event in the init function
    //      2. then call an internal setup (see form component for example)

    // Prototype.init = function(){
    // };
    
    // GETTERS
    // Add getters for params unique to this prototype

    // SETTERS
    // Add setters for params unique to this prototype

    // METHODS
    // Add methods unique to this prototype
    
    // exports
    Components.%CLASS%.Prototype = Prototype;
    return Components;

})(oem.Components || {}, oem.Core);