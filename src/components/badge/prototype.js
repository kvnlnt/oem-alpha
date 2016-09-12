(function(COMPONENTS, COMPONENT, PROTOTYPE) {


    // PROTOTYPE
    // ========================================================
    // This is the main prototype class for this component. It is meant to:
    // 1) contain any/all functional behavior for this component.
    // 2) be prototyped into a new instance for each component
    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Badge"
    });


    // MIXINS 
    // ========================================================
    // Augment funciontality with mixins from ./src/core/mixins

    // Core.Util.mixin(Prototype, Core.Mixins.Field);


    // DEFAULTS 
    // ========================================================
    // 1. Use this area to set parameters and defaults on the prototype not part of the original Core.Component prototype.
    // 2. Be sure to use getters/setters for each param

    // Prototype.newProperty = someValue;


    // INIT
    // ========================================================
    // 1. Use this area to run setup functions.
    // 2. The init function from the Core.Component prototype will be called automatically. 
    // 3. Sometimes you may want to set things up after an event (ie: COMPONENTS_COLLECTED):
    //      1. register that event in the init function
    //      2. then call an internal "init" function (see form component for example)

    // Initialize component
    // Prototype.init = function(){
    //      Core.Events.addEventListener(Core.EVENTS.COMPONENTS_COLLECTED, Prototype.initAfterComponentsLoaded.bind(this));
    // };
    // 
    // More initialization after components have been loaded
    // Prototype.initAfterComponentsLoaded = function(){
    //      console.log('now all components have been loaded, do something');
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
    COMPONENTS.Badge.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Prototypes.Component, oem.Core.Modules.Prototype);