/**
 * Field Prototype
 *
 * @class      Components (name)
 * @param      {<type>}   Core    The core
 * @return     {boolean}  { description_of_the_return_value }
 *
 * Implementation details:
 * Components looking to prototype this must: 
 * 1) Call the setupField method
 * 2) implement a "getField" method
 * 3) explicitly manage the field's value using setValue
 */

(function(COMPONENTS, PROTOTYPE, COMPONENT, VALIDATOR) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Field"
    });

    // DEFAULTS

    Prototype.form = null;
    Prototype.value = null;
    Prototype.validators = [];

    Prototype.setupField = function(){
        this.form = this.getEl().dataset.oemForm;
        if(oem.read(this.form)) oem.read(this.form).addField(this);
        this.setEvents({
            changed: this.getId() + ":changed"
        });
    };

    // GETTERS
    
    Prototype.getForm = function(){
        return this.form;
    };
    
    Prototype.getLabel = function(){
        return this.getEl().querySelector("label");
    }

    Prototype.getName = function(){
        return this.getField().name;
    };

    Prototype.getValue = function() {
        return this.value;
    };

    Prototype.getValidators = function(){
        return this.validators;
    };

    // SETTERS

    Prototype.setForm = function(form){
        this.form = form;
        return this;
    };

    Prototype.setValue = function(value) {
        this.value = value;
        return this;
    };

    // METHODS
    
    Prototype.addValidator = function(validator){
        this.validators.push(validator);
        return this;
    };

    Prototype.validate = function(){
        var that = this;
        var isValid = true;
        this.getValidators().forEach(function(validator){
            var args = validator.getArgs({val: that.getValue()});
            if(!VALIDATOR[validator.getValidation()](args)) {
                validator.show();
                isValid = false;
            }
        });
        return isValid;
    };

    // TODO
    Prototype.reset = function(){
        this.getValidators().forEach(function(validator){
            validator.hide();
        });
    };

    COMPONENTS.Field.Prototype = Prototype;
    return COMPONENTS;

})(
    oem.Components,
    oem.Core.Modules.Prototype,
    oem.Core.Prototypes.Component,
    oem.Components.Validator
);