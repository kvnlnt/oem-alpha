// USAGE
// - add an event listener on an event formatted like so "[THE FORM'S ID]:submitted". The "detail" property will contain all the cleaned data
(function(COMPONENTS, PROTOTYPE, COMPONENT, UTIL, LOG, VALIDATOR) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Form"
    });

    // DEFAULTS

    Prototype.fields = {};
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

    // SETTERS
    
    Prototype.setFields = function(fields){
        this.fields = fields;
        return this;
    };

    // METHODS
    
    Prototype.addField = function(field){
        if(!this.fields.hasOwnProperty(field.getId())) this.createFieldObject(field.getId());
        this.fields[field.getId()].component = field;
        return this;
    };

    Prototype.addValidator = function(validator){
        if(!this.fields.hasOwnProperty(validator.getField())) this.createFieldObject(validator.getField());
        this.fields[validator.getField()].validators.push(validator);
        return this;
    };

    Prototype.createFieldObject = function(fieldName){
        if(!this.fields.hasOwnProperty(fieldName)) this.fields[fieldName] = {
            component: null,
            validators:[]
        };
        return this;
    };

    Prototype.validate = function(field){

        var that = this;
        var fields = this.getFields();
        var isValid = true;
        var clean = {};
        var errors = {};
        var validators;

        for(var field in fields){
            if(fields[field].validators.length){
                fields[field].validators.forEach(function(validator){
                    // create argument list for validator module
                    var args = [fields[field].component.getValue()].concat(validator.getArgs());
                    // run validation
                    if(VALIDATOR[validator.getValidation()].apply(VALIDATOR, args)) {
                        // if clean, store it
                        clean[field] = fields[field].component.getValue();
                    } else {
                        // if error, add to error collection, show error and check form as invalid
                        if(!errors.hasOwnProperty(field)) errors[field] = [];
                        errors[field].push(validator.getMessage());
                        validator.show();
                        isValid = false;
                    }
                });
            } else {
                clean[field] = fields[field].getValue();
            }
        }

        return {
            isValid: isValid,
            clean: clean,
            errors: errors
        }

    };

    Prototype.resetValidation = function(){
        var fields = this.getFields();
        var validations;
        for(var field in fields){
            fields[field].validators.forEach(function(validator){
                validator.hide();
            });
        }
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
        console.log(validation);

        // if valid, broadcast
        if(validation.isValid){
            // trigger event with data
            oem.events.dispatch(this.getEvents().submitted, this, validation.clean);
            LOG(validation.clean);
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