// USAGE
// - add an event listener on an event formatted like so "[THE FORM'S ID]:submitted". The "detail" property will contain all the cleaned data
oem.Components = (function(Components, Core) {

    // Card component
    var Prototype = Core.Prototype(Core.Component, {
        type: "Form",
        selector: "oem-form"
    });

    // DEFAULTS

    Prototype.fields = [];
    Prototype.submitButton = null;
    Prototype.formId = null;
    Prototype.formSubmittedEventName = null;

    // SETUP

    Prototype.init = function(){
        // init only after components have been collected so we can access it's child oem configs
        Core.Events.addEventListener(Core.EVENTS.COMPONENTS_COLLECTED, Prototype.setup.bind(this));
    };

    Prototype.setup = function(){
        var fields = Core.Util.arrayFrom(this.getEl().children).map(function(field){
            return field.oem;
        });
        var submitButton = this.getEl().querySelector(".submit");
        var formId = this.getEl().id;

        // set fields
        this
        .setFields(fields)
        .setSubmitButton(submitButton)
        .setFormId(formId)
        .setFormSubmittedEventName(formId + ":submitted")
        .registerEvents();
    };

    // GETTERS

    Prototype.getFields = function(){
        return this.fields;
    };

    Prototype.getSubmitButton = function(){
        return this.submitButton;
    };

    Prototype.getFormId = function(){
        return this.formId;
    };

    Prototype.getFormSubmittedEventName = function(){
        return this.formSubmittedEventName;
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

    Prototype.setFormId = function(formId){
        this.formId = formId;
        return this;
    };

    Prototype.setFormSubmittedEventName = function(formSubmittedEventName){
        this.formSubmittedEventName = formSubmittedEventName;
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

            // if field has a validator then validate it!
            if(field.validate) {
                field.setValidateOnChange(true);
                validator = field.validate();
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
            Core.Util.mixin(clean, cleanCollection[collection]);
        }
        return clean;
    },

    Prototype.submitForm = function(clean){
        // trigger event with data
        var e = new CustomEvent(this.getFormSubmittedEventName(), {detail: clean});
        Core.Log(e);
        return e;
    };
    
    // exports
    Components.Form.Prototype = Prototype;
    return Components;

})(oem.Components || {}, oem.Core);