(function(COMPONENTS, COMPONENT, PROTOTYPE, UTIL) {


    // PROTOTYPE

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Validator"
    });

    // INIT

    Prototype.init = function(){
        var that = this;
        this.isShowing = false;
        this.field = this.getEl().dataset.oemField;
        this.validation = this.getEl().dataset.oemValidation;
        this.args = UTIL.parseStringToObject(this.getEl().dataset.oemArgs);
        this.message = this.getEl().innerText;
        // add after field initialization
        oem.events.addEventListener(oem.EVENTS.COMPONENTS_INITIALIZED, this.setup.bind(this));
    };
    
    // GETTERS
 
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