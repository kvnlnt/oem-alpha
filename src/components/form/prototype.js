oem.Components = (function(Components, Core) {

    // Card component
    var Prototype = Core.Prototype(Core.Component, {
        type: "Form",
        selector: "oem-form",
        fields: [],
        submitButton: null,
        method: 'post',
        action: '/'
    });

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
        var method = this.getEl().getAttribute("method") || this.getMethod();
        var action = this.getEl().getAttribute("action") || this.getAction();

        // set fields
        this
        .setFields(fields)
        .setSubmitButton(submitButton)
        .setMethod(method)
        .setAction(action)
        .registerEvents();
    };

    // GETTERS

    Prototype.getFields = function(){
        return this.fields;
    };

    Prototype.getSubmitButton = function(){
        return this.submitButton;
    };

    Prototype.getMethod = function(){
        return this.method;
    };

    Prototype.getAction = function(){
        return this.action;
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

    Prototype.setMethod = function(method){
        this.method = method;
        return this;
    };

    Prototype.setAction = function(action){
        this.action = action;
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
        console.log(clean, this.getMethod(), this.getAction());
    };
    
    // exports
    Components.Form.Prototype = Prototype;
    return Components;

})(oem.Components || {}, oem.Core);