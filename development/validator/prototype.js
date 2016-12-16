(function(COMPONENTS, COMPONENT, PROTOTYPE, UTIL) {


    // PROTOTYPE
    // ========================================================
    // This is the main prototype class for this component. It is meant to:
    // 1) contain any/all functional behavior for this component.
    // 2) be prototyped into a new instance for each component
    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Validator"
    });

    // DEFAULTS 

    Prototype.field = null;
    Prototype.validation = null;
    Prototype.args = [];
    Prototype.isShowing = false;

    // INIT

    Prototype.init = function(){
        this.field = this.getEl().dataset.oemField;
        this.validation = this.getEl().dataset.oemValidation;
        this.args = UTIL.parseStringToObject(this.getEl().dataset.oemArgs);
        this.message = this.getEl().innerText;
        oem.events.addEventListener(oem.EVENTS.COMPONENTS_INITIALIZED, this.setup.bind(this));
    };
    
    // GETTERS
    // ========================================================
    // Add getters for params unique to this prototype
 
    Prototype.getField = function(){
        return this.field;
    };

    Prototype.getValidation = function(){
        return this.validation;
    };

    Prototype.getArgs = function(kwargs){
        return UTIL.mixin(kwargs, this.args);
    };

    Prototype.getMessage = function(){
        return this.message;
    };

    // SETTERS

    Prototype.setField = function(field){
        this.field = field;
        return this;
    };

    // METHODS
    
    Prototype.setup = function(){
        oem.read(this.getField()).addValidator(this);
    };
    
    Prototype.show = function(){
        this.getEl().style.display = 'block';
        this.isShowing = true;
        return this;
    };

    Prototype.hide = function(){
        this.getEl().style.display = 'none';
        this.isShowing = false;
    };

    // EXPORTS

    COMPONENTS.Validator.Prototype = Prototype;
    return COMPONENTS;

})(
    oem.Components,
    oem.Core.Component,
    oem.Core.Prototype,
    oem.Core.Util);