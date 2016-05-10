oem.Components = (function(Components, Core) {

    var TextInputModel = {};

    TextInputModel.init = function(){
        var input = this.getEl(); 
        this.label = input.querySelector('label').innerText;
        this.field = input.querySelector('input[type="text"]');
        this.fieldName = this.field.getAttribute('name');
        this.errors = input.querySelector('ul.errors');
        this.hasValidatedOnce = true; // errors are displayed and interactively persist only AFTER a validation has taken place
        this.field.addEventListener('input', this.handleInputChange.bind(this)); // get the input field
    };

    TextInputModel.handleInputChange = function(){
        this.validate();
    };

    Components.TextInputModel = TextInputModel;
    return Components;

})(oem.Components || {}, oem.Core);