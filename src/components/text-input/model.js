oem.Components = (function(Components, Core) {

    // TextInput component
    var TextInput = Core.Prototype(Core.Component, {
        name: "TextInput",
        selector: "oem-text-input"
    });

    // mixins
    Core.Util.extend(TextInput, Core.Field); // mixin field functions

    TextInput.init = function(){
        var input = this.getEl(); 
        this.label = input.querySelector('label').innerText;
        this.field = input.querySelector('input[type="text"]');
        this.fieldName = this.field.getAttribute('name');
        this.errors = input.querySelector('ul.errors');
        this.hasValidatedOnce = true; // errors are displayed and interactively persist only AFTER a validation has taken place
        this.field.addEventListener('input', this.handleInputChange.bind(this)); // get the input field
    };

    TextInput.handleInputChange = function(){
        this.validate();
    };

    Components.TextInput = TextInput;
    return Components;

})(oem.Components || {}, oem.Core);