// USAGE
// - add an event listener on an event formatted like so "[THE FORM'S ID]:submitted". The "detail" property will contain all the cleaned data
(function(COMPONENTS, PROTOTYPE, COMPONENT, UTIL, LOG) {

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

        // register events
        this.setEvents({
            submitted: this.getId() + ":submitted"
        });

        // config reset button
        this
        .getEl()
        .querySelector('[type="reset"]')
        .addEventListener('click', this.reset.bind(this));
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
        this.fields[field.getId()] = field;
        return this;
    };

    Prototype.validate = function(field){
        this.reset();

        var that = this;
        var fields = this.getFields();
        var isValid = true;
        var clean = {};
        var validators;

        for(var field in fields){
            if(fields[field].validators.length){
                if(fields[field].validate()){
                    clean[field] = fields[field].getValue();
                } else {
                    isValid = false;
                }
            } else {
                // it's not a validated param, store it
                clean[field] = fields[field].getValue();
            }
        }

        // if this form hasn't been validated yet, it has now
        if(!this.hasBeenValidated()) this.setHasBeenValidated(true);

        // set the form to it's new validation state
        // update the clean and error vars
        this
        .setIsValid(isValid)
        .setClean(clean);

        return this;
    };

    Prototype.reset = function(){
        var that = this;
        var fields = this.getFields();
        Object.keys(this.getFields()).forEach(function(key){
            that.getFields()[key].reset();
        });
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
    oem.Core.Prototype, 
    oem.Core.Prototypes.Component, 
    oem.Core.Util,
    oem.Core.Log
);