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

(function(COMPONENTS, PROTOTYPE, COMPONENT) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Field"
    });

    // DEFAULTS

    Prototype.init = function(){
        var that = this;
        this.validators = [];
        this.form = this.getEl().dataset.oemForm;
        this.setValue(this.getField().value);
        // register events
        var events = {};
        events.changed = this.getId() + ":changed";
        events.initialized = this.getId() + ":initialized";
        this.setEvents(events);
        // if defined, register to form
        oem.events.addEventListener(oem.EVENTS.COMPONENTS_INITIALIZED, this.setup.bind(this));
        // tell the world this has been initialized
        oem.events.dispatch(events.initialized, this);
    };

    // GETTERS
    
    Prototype.getForm = function(){
        return this.form;
    };
    
    Prototype.getLabel = function(){
        return this.getEl().querySelector("label");
    };

    Prototype.getField = function(){
        var input = this.getEl().querySelector('input');
        return input;
    };

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

    Prototype.setup = function(){
        if(oem.read(this.form)) oem.read(this.form).addField(this);
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
            if(!oem.Components.Validator[validator.getValidation()](args)) {
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
    oem.Core.Prototype,
    oem.Core.Component
);