(function(COMPONENTS, PROTOTYPE, FIELD, EL) {

    var Prototype = PROTOTYPE(FIELD, {
        type: "TextInput"
    });

    // INIT

    Prototype.init = function(){
        this.setup();
        this.getField().addEventListener('input', this.handleInputChange.bind(this)); // get the input field
    };

    Prototype.createField = function(){
        var input = new EL("input", {type:"text", name:this.getName(), placeholder:this.getPlaceholder(), value:this.getValue()});
        return input;
    };

    Prototype.handleInputChange = function(){
        var currValue = this.getField().value;
        this.setValue(currValue).validate();
    };

    COMPONENTS.TextInput.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Modules.Prototype, oem.Core.Prototypes.Field, oem.Core.Modules.El);