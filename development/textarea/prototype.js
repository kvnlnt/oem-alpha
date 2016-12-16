(function(COMPONENTS, FIELD, PROTOTYPE) {

    var Prototype = PROTOTYPE(FIELD, {
        type: "Textarea"
    });

    Prototype.init = function(){
        this.setupField();
        this.getField().addEventListener('input', this.handleInputChange.bind(this)); // get the input field
        this.getField().addEventListener('focus', this.getField().select);
    };

    Prototype.getField = function(){
        var input = this.getEl().querySelector('textarea');
        return input;
    };

    Prototype.handleInputChange = function(){
        var currValue = this.getField().value;
        this.setValue(currValue);
        oem.events.dispatch(this.getEvents().changed, this, currValue);
    };


    COMPONENTS.Textarea.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components,
    oem.Components.Field.Prototype,
    oem.Core.Prototype
);