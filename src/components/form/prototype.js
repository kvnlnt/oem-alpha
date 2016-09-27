// USAGE
// - add an event listener on an event formatted like so "[THE FORM'S ID]:submitted". The "detail" property will contain all the cleaned data
(function(COMPONENTS, PROTOTYPE, COMPONENT, UTIL, LOG, VALIDATOR) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Form"
    });

    // DEFAULTS

    Prototype.fields = {};
    Prototype.submitButton = null;
    Prototype.validated = false;
    Prototype.valid = false;
    Prototype.clean = {};
    Prototype.errors = {};

    // INIT

    Prototype.init = function(){
        this.setEvents({
            submitted: this.getId() + ":submitted"
        });
    };

    // GETTERS

    Prototype.getClean = function(){
        return this.clean;
    };

    Prototype.getErrors = function(){
        return this.errors;
    };

    Prototype.getFields = function(){
        return this.fields;
    };

    Prototype.getValidators = function(){
        return this.validators;
    };

    Prototype.hasBeenValidated = function(){
        return this.validated;
    };

    Prototype.isValid = function(){
        return this.valid;
    };

    // SETTERS
    
    Prototype.setClean = function(clean){
        this.clean = clean;
        return this;
    };

    Prototype.setErrors = function(errors){
        this.errors = errors;
        return this;
    };

    Prototype.setFields = function(fields){
        this.fields = fields;
        return this;
    };

    Prototype.setHasBeenValidated = function(validated) {

        // if this has already been validated and validated is true
        // short circuit, we don't want to keep adding listeners to fields
        if(this.hasBeenValidated() && validated) return this;

        this.validated = validated;

        // if true, start listening for change events on all fields
        if(validated){
            for(var field in this.getFields()){
                // if the field has a changed event, we'll listen for it
                field = oem.read(field);
                if(field.getEvents().changed){
                    oem.events.addEventListener(field.getEvents().changed, this.validate.bind(this));                                    
                }
            }
        } 
        return this;
    };

    Prototype.setIsValid = function(valid){
        this.valid = valid;
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
        this.resetValidation();

        var that = this;
        var fields = this.getFields();
        var isValid = true;
        var clean = {};
        var errors = {};
        var validators;

        for(var field in fields){
            if(fields[field].validators.length){
                fields[field].validators.forEach(function(validator){
                    // create argument object for validator module
                    var args = {};
                    args.val = fields[field].component.getValue();
                    UTIL.mixin(args, validator.getArgs());
                    // run validation
                    if(VALIDATOR[validator.getValidation()](args)) {
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

        // only do this once
        if(!this.hasBeenValidated()) this.setHasBeenValidated(true);

        this
        .setIsValid(isValid)
        .setClean(clean)
        .setErrors(errors);

        return this;
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

    Prototype.submit = function(){
        var validation = this.validate();
        var that = this;

        // if valid, broadcast
        if(this.isValid()){
            // trigger event with data
            oem.events.dispatch(this.getEvents().submitted, this, this.getClean());
            LOG(this.getClean());
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