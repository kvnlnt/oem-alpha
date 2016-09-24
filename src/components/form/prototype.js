// USAGE
// - add an event listener on an event formatted like so "[THE FORM'S ID]:submitted". The "detail" property will contain all the cleaned data
(function(COMPONENTS, PROTOTYPE, COMPONENT, UTIL, LOG, VALIDATOR) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Form"
    });

    // DEFAULTS

    Prototype.fields = [];
    Prototype.validators = [];
    Prototype.submitButton = null;

    // INIT

    Prototype.init = function(){
        this.setEvents({
            submitted: this.getId() + ":submitted"
        });
    };

    // GETTERS

    Prototype.getFields = function(){
        return this.fields;
    };

    Prototype.getValidators = function(){
        return this.validators;
    };

    Prototype.getValidatorsByField = function(field){
        return this.getValidators().filter(function(validator){
            return validator.getField() === field.getId();
        });
    };

    Prototype.getValidatorByType = function(type){
        return this.getValidators().filter(function(validator){
            return validator.getValidation() === type;
        })[0];
    };

    // SETTERS
    
    Prototype.setFields = function(fields){
        this.fields = fields;
        return this;
    };

    // METHODS
    
    Prototype.addField = function(field){
        this.fields.push(field);
        return this;
    };

    Prototype.addValidator = function(validator){
        this.validators.push(validator);
        return this;
    };

    Prototype.validate = function(field){

        var that = this;
        var fields = this.getFields();
        var validator = new VALIDATOR();
        var validators;

        // loop fields
        fields.forEach(function(field){
            // get validations
            validators = that.getValidatorsByField(field);
            // if it has validators, run them
            if(validators){
                validators.forEach(function(v){
                    validator[v.getValidation()].apply(validator, v.getArgs(field.getValue()))
                });
            } else {
                // manually add field to clean collection
                validator._addClean(field.getId(), field.getValue());
            }
        });

        return validator;

    };

    Prototype.resetValidation = function(){
        this.getValidators().forEach(function(validator){
            validator.hide();
        });
    };

    Prototype.convertCleanCollectionToObject = function(cleanCollection){
        var clean = {};
        for(var collection in cleanCollection) {
            UTIL.mixin(clean, cleanCollection[collection]);
        }
        return clean;
    },

    Prototype.submit = function(){
        this.resetValidation();
        var validation = this.validate();
        var that = this;

        // if valid, broadcast
        if(validation.isValid){
            // trigger event with data
            oem.events.dispatch(this.getEvents().submitted, this, validation.clean);
            LOG(validation.clean);
        } else {
            // show errors
            for(var e in validation.errors){
                validation.errors[e].forEach(function(error){
                    var validator = that.getValidatorByType(error.type);
                    validator.show(validator.getMessage() || error.message);
                });
            }
        }
        
    };
    
    // exports
    COMPONENTS.Form.Prototype = Prototype;
    return COMPONENTS;

})(
    oem.Components,
    oem.Core.Modules.Prototype, 
    oem.Core.Prototypes.Component, 
    oem.Core.Modules.Util,
    oem.Core.Modules.Log,
    oem.Core.Modules.Validator
);