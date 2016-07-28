// USAGE
// - add an event listener on an event formatted like so "[THE FORM'S ID]:submitted". The "detail" property will contain all the cleaned data
(function(COMPONENTS, PROTOTYPE, COMPONENT, UTIL) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Form",
        selector: "oem-form"
    });

    // DEFAULTS

    Prototype.fields = [];
    Prototype.submitButton = null;

    // INIT

    Prototype.init = function(){
        // init only after oem components have been collected and initialized
        oem.events.addEventListener(oem.EVENTS.COMPONENTS_COLLECTED, Prototype._init.bind(this));
    };

    Prototype._init = function(){

        // get fields
        var fields = UTIL.arrayFrom(this.getEl().children).map(function(field){
            return field.id;
        });

        // get submit button
        var submitButton = this.getEl().querySelector(".submit");

        // create events
        var events = {
            submitted: this.getId() + ":submitted"
        };

        // 
        this
        .setSubmitButton(submitButton)
        .setEvents(events)
        .setFields(fields)
        .registerEvents();
    };

    // GETTERS

    Prototype.getFields = function(){
        return this.fields;
    };

    Prototype.getSubmitButton = function(){
        return this.submitButton;
    };

    // SETTERS
    
    Prototype.setFields = function(fields){
        this.fields = fields;
        return this;
    };

    Prototype.setSubmitButton = function(submitButton){
        this.submitButton = submitButton;
        return this;
    };

    // METHODS

    Prototype.registerEvents = function(submitButton, fields){
        var that = this;

        var submitButton = submitButton || this.getSubmitButton();
        var fields = fields || this.getFields();
        submitButton.addEventListener('click', function(e){
            e.preventDefault();
            var formValidation = that.validateForm(fields);
            if(formValidation.isValid){
                var clean = that.convertCleanCollectionToObject(formValidation.cleanCollection);
                that.submitForm(clean);
            } else {
                // noop, field validations take care of themselves
            }
        });
        return this;
    };

    Prototype.validateForm = function(fields){

        var fields = fields || this.fields;
        var isValid = true;
        var cleanCollection = [];
        var errorCollection = [];

        // loop and validate
        // if errors found, set flag and return errors
        // if no errors found, get clean data and submit
        this.fields.forEach(function(field){
            var validator;
            var fieldComponent = oem.read(field);

            // if field has a validator then validate it!
            if(fieldComponent.validate) {
                fieldComponent.setValidateOnChange(true);
                validator = fieldComponent.validate();
                cleanCollection.push(validator.clean);
                if(validator.errors != null) {
                    errorCollection.push(validator.errors);
                    isValid = false;
                }
            }
        });

        return {
            isValid: isValid,
            cleanCollection: cleanCollection,
            errorCollection: errorCollection 
        }
    };

    Prototype.convertCleanCollectionToObject = function(cleanCollection){
        var clean = {};
        for(var collection in cleanCollection) {
            UTIL.mixin(clean, cleanCollection[collection]);
        }
        return clean;
    },

    Prototype.submitForm = function(clean){
        // trigger event with data
        oem.events.dispatch(this.getEvents().submitted, this, clean);
        // var e = new CustomEvent(, {detail: clean, type: this.getEvents().submitted});
        // Core.Modules.Log(e);
        // return e;
    };
    
    // exports
    COMPONENTS.Form.Prototype = Prototype;
    return COMPONENTS;

})(
    oem.Components,
    oem.Core.Modules.Prototype, 
    oem.Core.Modules.Component, 
    oem.Core.Modules.Util
);