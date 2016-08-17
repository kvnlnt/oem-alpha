// USAGE
// - add an event listener on an event formatted like so "[THE FORM'S ID]:submitted". The "detail" property will contain all the cleaned data
(function(COMPONENTS, PROTOTYPE, COMPONENT, UTIL, LOG) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Form"
    });

    // DEFAULTS

    Prototype.fields = [];
    Prototype.submitButton = null;

    // INIT

    Prototype.init = function(){
        // init only after oem components have been collected and initialized
        oem.events.addEventListener(oem.EVENTS.COMPONENTS_COLLECTED, Prototype._init.bind(this));
    };

    /**
     * Internal init called after all components have been collected by Oem
     * @return {[type]} [description]
     */
    Prototype._init = function(){

        // get fields
        var fields = UTIL.arrayFrom(this.getEl().querySelectorAll('[data-oem-id]')).map(function(field){
            return field.dataset.oemId;
        });

        // get submit button
        var submitButton = oem.read(this.getEl().dataset.oemSubmitButton);

        // create events
        var events = {
            submitted: this.getId() + ":submitted"
        };

        // config
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

    // HANDLERS
    Prototype.handleFormSubmit = function(e){
        e.preventDefault();
        var validatedForm = this.validateForm();
        if(validatedForm.isValid) this.submitForm(validatedForm.cleanCollection);
    }

    // METHODS

    Prototype.registerEvents = function(submitButton, fields){
        var submitButton = submitButton || this.getSubmitButton();
        submitButton.getEl().addEventListener('click', this.handleFormSubmit.bind(this));
        return this;
    };

    Prototype.validateForm = function(fields){

        var fields = fields || this.getFields();
        var isValid = true;
        var cleanCollection = {};
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
                validatedField = fieldComponent.validate();
                if(validatedField.isValid) {
                    cleanCollection[fieldComponent.getName()] = fieldComponent.getValue();
                } else {
                    isValid = false;
                    errorCollection.push(validatedField.errors);
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
        LOG(clean);
        // return e;
    };
    
    // exports
    COMPONENTS.Form.Prototype = Prototype;
    return COMPONENTS;

})(
    oem.Components,
    oem.Core.Modules.Prototype, 
    oem.Core.Prototypes.Component, 
    oem.Core.Modules.Util,
    oem.Core.Modules.Log
);