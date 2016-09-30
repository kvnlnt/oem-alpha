(function(COMPONENTS, PROTOTYPE, FIELD, EL) {

    var Prototype = PROTOTYPE(FIELD, {
        type: "TextInput"
    });

    // INIT

    Prototype.init = function(){
        this.setupField();
        this.setValue(this.getField().value);
        this.getField().addEventListener('input', this.handleInputChange.bind(this)); // get the input field
        this.getField().addEventListener('focus', this.getField().select);
    };

    Prototype.getField = function(){
        var input = this.getEl().querySelector('input');
        return input;
    };

    Prototype.handleInputChange = function(){
        var currValue = this.getField().value;
        oem.events.dispatch(this.getEvents().changed, this, currValue);
        this.setValue(currValue);
    };

    COMPONENTS.TextInput.Prototype = Prototype;
    return COMPONENTS;

})(
    oem.Components,
    oem.Core.Modules.Prototype,
    oem.Components.Prototype.Field,
    oem.Core.Modules.El
);