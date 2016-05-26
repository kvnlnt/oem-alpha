/**
 * Field Mixin
 *
 * @class      Components (name)
 * @param      {<type>}   Core    The core
 * @return     {boolean}  { description_of_the_return_value }
 */

oem.Core = (function(Core) {

    var Field = {};

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

        this.renderErrors(validator);
        
    };

    Field.renderErrors = function(validator){

        // empty error list
        while (this.errors.hasChildNodes()) {
            this.errors.removeChild(this.errors.lastChild);
        }

        // leave if no errors
        if(validator.isValid) return false;

        // don't do anything until we've validated things
        if(!this.hasValidatedOnce) return false;

        var errors = validator.errors[this.fieldName];

        // now populate
        for(var i = 0; i < errors.length; i = i + 1){
            li = document.createElement('li');
            li.innerText = errors[i];
            this.errors.appendChild(li);
        }
    };

    Core.Field = Field;
    return Core;

})(oem.Core || {});