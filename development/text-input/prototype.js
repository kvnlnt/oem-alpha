(function(COMPONENTS, PROTOTYPE, FIELD) {

    var Prototype = PROTOTYPE(FIELD, {
        type: "TextInput"
    });

    // INIT

    Prototype.init = function(){
        this.super.init.call(this);
        this.setValue(this.getField().value);
        this.getField().addEventListener('input', this.handleInputChange.bind(this)); // get the input field
        this.getField().addEventListener('focus', this.getField().select);
    };

    Prototype.getField = function(){
        var field = this.getEl().querySelector('input');
        return field;
    };

    Prototype.handleInputChange = function(){
        var fieldValue = this.getField().value;
        var currValue = this.mask ? this.maskValue(fieldValue, this.getMask(), this.getPattern()) : fieldValue;
        this.setValue(currValue);
        if(this.mask) this.getField().value = currValue;
        oem.events.dispatch(this.getEvents().changed, this, currValue);
    };

    COMPONENTS.TextInput.Prototype = Prototype;
    return COMPONENTS;

})(
    oem.Components,
    oem.Core.Prototype,
    oem.Components.Field.Prototype
);