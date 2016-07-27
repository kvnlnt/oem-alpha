/**
 * Field Mixin
 *
 * @class      Components (name)
 * @param      {<type>}   Core    The core
 * @return     {boolean}  { description_of_the_return_value }
 */

oem.Core.Mixins = (function(Core, Mixins) {

    var Field = {};

     // GETTERS

    Field.getLabel = function(){
        return this.getEl().querySelector('label').innerText;
    };

    Field.getField = function(){
        return this.getEl().querySelector('input[type="text"]');
    };

    Field.getFieldName = function(){
        return this.field.getAttribute('name');
    };

    Field.getErrors = function(){
        return this.getEl().querySelector('ul.errors');
    };

    // SETTERS

    Field.setLabel = function(label){
        this.getEl().querySelector('label').innerText = label;
        this.label = label;
        return this;
    };

    Field.setField = function(field){
        this.field = field;
        return this;
    };

    Field.setFieldName = function(fieldName){
        this.field.setAttribute('name', fieldName);
        this.fieldName = fieldName;
        return this;
    };

    Field.setErrors = function(liErrors){
        this.getEl().querySelector('ul.errors').innerHTML = liErrors;
        this.errors = this.getEl().querySelector('ul.errors');
        return this;
    };

    Field.setValidateOnChange = function(validateOnChange){
        this.validateOnChange = validateOnChange;
        return this;
    };

    // METHODS
    
    // TODO
    Field.reset = function(){};
    
    Field.setupInputField = function(){
        this.label = this.getLabel();
        this.field = this.getField();
        this.fieldName = this.getFieldName();
        this.errors = this.getErrors();
        this.validateOnChange = false; // errors are displayed and interactively persist only AFTER a validation has taken place
        this.field.addEventListener('input', this.handleInputChange.bind(this)); // get the input field
    };

    Field.handleInputChange = function(){
        this.validate();
    };

    Field.validate = function(){

        // create a brand new one each time, that's right start over
        var validator = new Core.Validator();
        var input = this.getEl();
        var value = this.field.value;
        var configElements = input.querySelectorAll('div.validations > div');

        // collect validations
        var arguments;
        var configElement;
        var validation;
        var settings;
        var errorMessage;

        for(var i = 0; i < configElements.length; i = i + 1){
            configElement = configElements[i];
            errorMessage = configElement.innerText;
            validation = configElement.dataset.validation;
            settings = configElement.dataset.settings.split(',');
            arguments = [];
            arguments.push(this.fieldName);
            arguments.push(this.label);
            arguments.push(value); // get field value
            arguments.push.apply(arguments, settings); // add validation arguments
            arguments.push(errorMessage); // add message
            validator[validation].apply(validator, arguments);
        }

        // XXX : All fields need a validator as it is used to collect it's data
        // in order to handle optional fields where validation is not specified
        // automatically assign the "skip" validation
        

        this.renderErrors(validator);

        return validator;
        
    };

    Field.renderErrors = function(validator){

        // empty error list
        while (this.errors.hasChildNodes()) {
            this.errors.removeChild(this.errors.lastChild);
        }

        // leave if no errors
        if(validator.isValid) return false;

        // don't do anything until we've validated things
        if(!this.validateOnChange) return false;

        var errors = validator.errors[this.fieldName];

        // now populate
        for(var i = 0; i < errors.length; i = i + 1){
            li = document.createElement('li');
            li.innerText = errors[i];
            this.errors.appendChild(li);
        }
    };

    Mixins.Field = Field;
    return Mixins;

})(oem.Core || {}, oem.Core.Mixins || {});