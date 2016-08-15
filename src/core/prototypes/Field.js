/**
 * Field Mixin
 *
 * @class      Components (name)
 * @param      {<type>}   Core    The core
 * @return     {boolean}  { description_of_the_return_value }
 */

(function(CORE, PROTOTYPE, COMPONENT, VALIDATOR, UTIL) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Field"
    });

    // DEFAULTS

    Prototype.field = null;
    Prototype.label = null;
    Prototype.help = '';
    Prototype.name = null;
    Prototype.value = null;
    Prototype.errors = [];
    Prototype.validations = [];
    Prototype.validateOnChange = false;

    // GETTERS

    Prototype.getField = function() {
        return this.field;
    };

    Prototype.getLabel = function() {
        return this.label;
    };

    Prototype.getName = function() {
        return this.name;
    };

    Prototype.getPlaceholder = function(){
        return this.placeholder;
    };

    Prototype.getValue = function() {
        return this.value;
    };

    Prototype.getErrors = function() {
        return this.errors;
    };

    Prototype.getHelp = function() {
        return this.help;
    };

    Prototype.getValidations = function() {
        return this.validations;
    };

    Prototype.getValidateOnChange = function() {
        return this.validateOnChange;
    };

    // SETTERS

    Prototype.setField = function(field) {
        this.field = field;
        return this;
    };

    Prototype.setLabel = function(label) {
        this.label = label;
        return this;
    };

    Prototype.setName = function(name) {
        this.name = name;
        return this;
    };

    Prototype.setPlaceholder = function(placeholder){
        this.placeholder = placeholder;
        return this;
    }

    Prototype.setValue = function(value) {
        this.value = value;
        return this;
    };

    Prototype.setErrors = function(errors) {
        this.errors = errors;
        return this;
    };

    Prototype.setHelp = function(help) {
        this.help = help;
        return this;
    };

    Prototype.setValidations = function(validations) {
        this.validations = validations;
        return this;
    };

    Prototype.setValidateOnValueChange = function(validateOnChange) {
        this.validateOnChange = validateOnChange;
        return this;
    };

    // METHODS

    Prototype.getValidationsFromEl = function(){
        var dataAttrs = this.getEl().dataset;
        var validations = [];
        for(var x in dataAttrs){
            var args = dataAttrs[x];
            var isValidation = x.indexOf("oemValidate") > -1;
            if(isValidation){
                var validationType = x.replace("oemValidate","");
                var validation = validationType[0].toLowerCase() + validationType.slice(1); // lowercase first letter
                var args = args.split("|").map(function(arg){ return UTIL.typeCast(arg) }); 
                validations.push({
                    validation: validation,
                    args: args
                });
            }
        }
        return validations;
    };

    // TODO
    Prototype.reset = function(){};

    Prototype.validate = function(){

        // create a brand new one each time, that's right start over
        var validator = new VALIDATOR();
        var that = this;

        // XXX : All fields need a validator as it is used to collect it's data
        // in order to handle optional fields where validation is not specified
        // automatically assign the "skip" validation
        this.getValidations().forEach(function(validation){
            var args = [];
            args.push(that.getName());
            args.push(that.getLabel());
            args.push(that.getValue());
            args.push.apply(args, validation.args);
            validator[validation.validation].apply(validator, args);
        });
        
        // update collection and render errors
        this.setErrors(validator.errors).renderErrors();

        return validator;

    };

    Prototype.renderErrors = function(errors){

        var errors = errors || this.getErrors();
        var errorList = this.getEl().querySelector("ul.errors");

        // empty error list
        while (errorList.hasChildNodes()) {
            errorList.removeChild(errorList.lastChild);
        }

        // now populate
        for(var x in errors){
            errors[x].forEach(function(error){
                var li = document.createElement('li');
                li.innerText = error;
                errorList.appendChild(li);
            });
        }

        return errorList;
    };

    CORE.Prototypes.Field = Prototype;
    return CORE;

})(oem.Core, oem.Core.Modules.Prototype, oem.Core.Prototypes.Component, oem.Core.Modules.Validator, oem.Core.Modules.Util);