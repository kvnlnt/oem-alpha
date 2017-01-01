(function(COMPONENTS, FIELD, PROTOTYPE) {


    // PROTOTYPE

    var Prototype = PROTOTYPE(FIELD, {
        type: "Toggle"
    });

    Prototype.init = function(){
        this.super.init.call(this);
        this.setValue(this.getField().checked);
        this.getField().addEventListener('change', this.handleInputChange.bind(this)); // get the input field
        this.getField().addEventListener('focus', this.getField().select);
    };

    Prototype.getField = function(){
        var field = this.getEl().querySelector('input');
        return field;
    };

    Prototype.handleInputChange = function(){
        var currValue = this.getField().checked;
        this.setValue(currValue);
        oem.events.dispatch(this.getEvents().changed, this, currValue);
    };

   
    COMPONENTS.Toggle.Prototype = Prototype;
    return COMPONENTS;

})(
    oem.Components,
    oem.Components.Field.Prototype,
    oem.Core.Prototype
);