/**
 * Field Mixin
 *
 * @class      Components (name)
 * @param      {<type>}   Core    The core
 * @return     {boolean}  { description_of_the_return_value }
 */

(function(CORE, PROTOTYPE, COMPONENT, VALIDATOR, UTIL, EL) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Field"
    });

    // DEFAULTS

    Prototype.value = null;
    Prototype.errors = {};
    Prototype.validations = [];
    Prototype.isValid = false;
    Prototype.validateOnChange = false;

    // SETUP
    
    /**
     * Setup field elements
     */
    Prototype.setupField = function(){
        this
        .setValidateOnChange()
        .setValidations();
        return this;
    };

    // GETTERS
    
    Prototype.getName = function(){
        return this.getField().name;
    };

    Prototype.getLabel = function(){
        return this.getEl().querySelector("label");
    }

    Prototype.getValue = function() {
        return this.value;
    };

    Prototype.getErrors = function() {
        return this.errors;
    };

    Prototype.getErrorWrapper = function(){
        return this.getEl().querySelector('ul.errors');
    };

    Prototype.getValidations = function() {
        return this.validations;
    };

    Prototype.getIsValid = function(){
        return this.isValid;
    };

    Prototype.getValidateOnChange = function() {
        return this.validateOnChange;
    };

    Prototype.getValidationsFromEl = function(){
        var dataAttrs = this.getEl().dataset;
        var validations = [];
        for(var x in dataAttrs){
            var args = dataAttrs[x];
            var isValidation = x.indexOf("oemValidate") > -1;
            if(isValidation && x !== "oemValidateOnChange"){
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

    // SETTERS

    Prototype.setValue = function(value) {
        this.value = value;
        return this;
    };

    Prototype.setErrors = function(errors) {
        this.errors = errors;
        return this;
    };

    Prototype.setValidations = function(validations) {
        this.validations = validations || this.getValidationsFromEl();
        return this;
    };

    Prototype.setIsValid = function(isValid){
        this.isValid = isValid;
        return this;
    };

    Prototype.setValidateOnChange = function(validateOnChange) {
        this.validateOnChange = validateOnChange || this.getEl().dataset.oemValidateOnChange;
        return this;
    };

    // VALIDATION

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
            args.push(that.getLabel().innerText);
            args.push(that.getValue());
            args.push.apply(args, validation.args);
            validator[validation.validation].apply(validator, args);
        });
        
        // update collection and render errors
        this.setErrors(validator.errors).renderErrors();

        // update validation status
        this.setIsValid(validator.isValid);

        return validator;
    };

    // RENDERERS

    Prototype.renderErrors = function(errors){

        var errors = errors || this.getErrors();
        var errorWrapper = this.getErrorWrapper();

        if(errors){
            this.getEl().classList.add("error");
        } else {
            this.getEl().classList.remove("error");
        }

        // empty error list
        while (errorWrapper.hasChildNodes()) {
            errorWrapper.removeChild(errorWrapper.lastChild);
        }

        // now populate
        for(var x in errors){
            errors[x].forEach(function(error){
                var li = document.createElement('li');
                li.innerText = error;
                errorWrapper.appendChild(li);
            });
        }

        return errorWrapper;
    };

    // METHODS
    
    // TODO
    Prototype.reset = function(){};

    CORE.Prototypes.Field = Prototype;
    return CORE;

})(
    oem.Core,
    oem.Core.Modules.Prototype,
    oem.Core.Prototypes.Component,
    oem.Core.Modules.Validator,
    oem.Core.Modules.Util,
    oem.Core.Modules.El
);