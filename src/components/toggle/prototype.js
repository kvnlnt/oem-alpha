(function(COMPONENTS, PROTOTYPE, FIELD, EL) {

    // PROTOTYPE

    var Prototype = PROTOTYPE(FIELD, {
        type: "Toggle"
    });

    // INIT

    Prototype.init = function(){
        this.setupField();
        this.setValue(this.getField().checked);
        this.getField().addEventListener('change', this.handleChange.bind(this)); // get the input field
    };

    Prototype.getField = function(){
        var input = this.getEl().querySelector('input');
        return input;
    };

    Prototype.handleChange = function(){
        var currValue = this.getField().checked;
        this.setValue(currValue);
        if(this.getValidateOnChange()) this.validate();
    };

    COMPONENTS.Toggle.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Modules.Prototype, oem.Core.Prototypes.Field, oem.Core.Modules.El);
