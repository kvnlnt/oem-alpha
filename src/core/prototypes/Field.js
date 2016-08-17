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

    Prototype.field = null;
    Prototype.label = null;
    Prototype.help = '';
    Prototype.name = null;
    Prototype.value = null;
    Prototype.errors = {};
    Prototype.errorWrapper = null;
    Prototype.validations = [];
    Prototype.isValid = false;
    Prototype.validateOnChange = false;

    // SETUP
    
    /**
     * Setup field elements
     */
    Prototype.setupField = function(){
        this
        .setName()
        .setPlaceholder()
        .setValue()
        .setValidations()
        .setLabel(this.createLabel())
        .setHelp(this.createHelp())
        .setField(this.createField())
        .setErrorWrapper(this.createErrorWrapper())
        .render();
        return this;
    };

    // CREATE ELEMENTS

    Prototype.createField = function(){
        var input = new EL("input", {type:"text", name:this.getName(), placeholder:this.getPlaceholder(), value:this.getValue()});
        return input;
    };

    Prototype.createLabel = function(name, label){
        var name = name || this.getName();
        var label = label || this.getEl().dataset.oemLabel;
        return new EL("label", { for:name}, label);
    };

    Prototype.createHelp = function(help){
        var help = help || this.getEl().dataset.oemHelp;
        return new EL("div", { class:"help"}, help);
    };

    Prototype.createErrorWrapper = function(){
        return new EL("ul", {class:"errors"});
    };

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

    Prototype.getErrorWrapper = function(){
        return this.errorWrapper;
    }; 

    Prototype.getHelp = function() {
        return this.help;
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
        this.name = name || this.getEl().dataset.oemName;
        return this;
    };

    Prototype.setPlaceholder = function(placeholder){
        this.placeholder = placeholder || this.getEl().dataset.oemPlaceholder;
        return this;
    }

    Prototype.setValue = function(value) {
        this.value = value || (this.getEl().dataset.oemValue || "");
        return this;
    };

    Prototype.setErrors = function(errors) {
        this.errors = errors;
        return this;
    };

    Prototype.setErrorWrapper = function(errorWrapper){
        this.errorWrapper = errorWrapper;
        return this;
    }

    Prototype.setHelp = function(help) {
        this.help = help;
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
        this.validateOnChange = validateOnChange;
        return this;
    };

    // VALIDATION

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
    
    Prototype.render = function(){
        // render elements
        this.getEl().appendChild(this.getLabel());
        this.getEl().appendChild(this.getHelp());
        this.getEl().appendChild(this.getField());
        this.getEl().appendChild(this.getErrorWrapper());
    };

    Prototype.renderErrors = function(errors){

        var errors = errors || this.getErrors();
        var errorWrapper = this.getErrorWrapper();

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