(function(COMPONENTS, COMPONENT, PROTOTYPE) {


    // PROTOTYPE
    // ========================================================
    // This is the main prototype class for this component. It is meant to:
    // 1) contain any/all functional behavior for this component.
    // 2) be prototyped into a new instance for each component
    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Validator"
    });

    // DEFAULTS 

    Prototype.form = null;
    Prototype.field = null;
    Prototype.validation = null;
    Prototype.args = [];

    // INIT

    Prototype.init = function(){
        this.form = this.getEl().dataset.oemForm;
        this.field = this.getEl().dataset.oemField;
        this.validation = this.getEl().dataset.oemValidation;
        this.args = this.getEl().dataset.oemArgs.split("|");
        this.message = this.getEl().innerText;
        oem.read(this.form).addValidator(this);
    };
    
    // GETTERS
    // ========================================================
    // Add getters for params unique to this prototype
 
    Prototype.getForm = function(){
         return this.form;
    };

    Prototype.getField = function(){
        return this.field;
    };

    Prototype.getValidation = function(){
        return this.validation;
    };

    Prototype.getArgs = function(){
        return this.args;
    };

    Prototype.getMessage = function(){
        return this.message;
    };

    /**
     * Get arguments for validator module
     * @param  {[type]} fieldVal [description]
     * @return {[type]}          [description]
     */
    Prototype.getArgs = function(fieldVal){
        return this.args;
    };

    // SETTERS

    Prototype.setForm = function(form){
        this.form = form;
        return this;
    };

    Prototype.setField = function(field){
        this.field = field;
        return this;
    };

    // METHODS
    
    Prototype.show = function(){
        this.getEl().style.display = 'block';
        return this;
    };

    Prototype.hide = function(){
        this.getEl().style.display = 'none';
    };

    // EXPORTS

    COMPONENTS.Validator.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Prototypes.Component, oem.Core.Modules.Prototype);