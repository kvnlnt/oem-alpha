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
        this.label = input.querySelector('label').innerText;
        this.field = input.querySelector('input[type="text"]');
        this.fieldName = this.field.getAttribute('name');
        this.errors = input.querySelector('ul.errors');
        this.hasValidatedOnce = true; // errors are displayed and interactively persist only AFTER a validation has taken place
        this.field.addEventListener('input', this.handleInputChange.bind(this)); // get the input field
    };

    Prototype.handleInputChange = function(){
        this.validate();
    };

    Components.TextInput.Prototype = Prototype;
    return Components;

})(oem.Components || {}, oem.Core);