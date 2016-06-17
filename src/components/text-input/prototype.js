oem.Components = (function(Components, Core) {

    // Prototype component
    var Prototype = Core.Prototype(Core.Component, {
        type: "TextInput",
        selector: "oem-text-input"
    });

    // mixins
    Core.Util.mixin(Prototype, Core.Field); // mixin field functions

    Prototype.init = function(){
        var input = this.getEl(); 
        this.label = this.getLabel();
        this.field = this.getField();
        this.fieldName = this.getFieldName();
        this.errors = this.getErrors();
        this.hasValidatedOnce = true; // errors are displayed and interactively persist only AFTER a validation has taken place
        this.field.addEventListener('input', this.handleInputChange.bind(this)); // get the input field
    };

    // GETTERS

    Prototype.getLabel = function(){
        return this.getEl().querySelector('label').innerText;
    };

    Prototype.getField = function(){
        return this.getEl().querySelector('input[type="text"]');
    };

    Prototype.getFieldName = function(){
        return this.field.getAttribute('name');
    };

    Prototype.getErrors = function(){
        return this.getEl().querySelector('ul.errors');
    };

    // SETTERS

    Prototype.setLabel = function(label){
        this.getEl().querySelector('label').innerText = label;
        this.label = label;
        return this;
    };

    Prototype.setField = function(field){
        this.field = field;
        return this;
    };

    Prototype.setFieldName = function(fieldName){
        this.field.setAttribute('name', fieldName);
        this.fieldName = fieldName;
        return this;
    };

    Prototype.setErrors = function(liErrors){
        this.getEl().querySelector('ul.errors').innerHTML = liErrors;
        this.errors = this.getEl().querySelector('ul.errors');
        return this;
    };

    // METHODS

    Prototype.handleInputChange = function(){
        this.validate();
    };

    Components.TextInput.Prototype = Prototype;
    return Components;

})(oem.Components || {}, oem.Core);