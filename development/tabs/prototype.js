(function(COMPONENTS, COMPONENT, PROTOTYPE) {


    // PROTOTYPE
    // ========================================================
    // This is the main prototype class for this component. It is meant to:
    // 1) contain any/all functional behavior for this component.
    // 2) be prototyped into a new instance for each component
    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Tabs"
    });


    // MIXINS 
    // ========================================================
    // Augment funciontality with mixins from ./src/core/mixins

    // Core.Util.mixin(Prototype, Core.Mixins.Field);


    // DEFAULTS 
    // ========================================================
    // 1. Use this area to set parameters and defaults on the prototype not part of the original Core.Component prototype.
    // Reminder: If you plan to use this component as a prototype for other components, this parameter will be "global" to those components
    // in that case, maybe try and set up your "local" parameters inside the init function.

    // Prototype.newProperty = someValue;


    // INIT
    // ========================================================
    // 1. Use this area to run setup functions and initialize params
    // 2. The init function from the Core.Component prototype will be called automatically. 
    // 3. Sometimes you may want to set things up after an event (ie: COMPONENTS_COLLECTED):
    //      1. register that event in the init function
    //      2. then call an internal "init" function (see form component for example)

    // Initialize component
    // Prototype.init = function(){
    // };

    // GETTERS
    // ========================================================
    // Add getters for params unique to this prototype
 
    // Prototype.getNewProperty = function(){
    //      return this.newProperty;
    // };


    // SETTERS
    // ========================================================
    // Add setters for params unique to this prototype

    // Prototype.setNewProperty = function(newProperty){
    //     return this.newProperty;
    // };


    // METHODS
    // ========================================================
    // Add methods unique to this prototype
    
    
    // EXPORTS
    // ========================================================
    // Probably only want to export the prototype
    COMPONENTS.Tabs.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Component, oem.Core.Prototype);