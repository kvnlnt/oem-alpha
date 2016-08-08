(function(COMPONENTS, PROTOTYPE, COMPONENT, MIXIN, FIELD) {

    var Prototype = PROTOTYPE(COMPONENT, {
        type: "TextInput"
    });

    // MIXINS

    MIXIN(Prototype, FIELD); // mixin field functions

    // INIT

    Prototype.init = function(){
        this.setupInputField();
    };

    COMPONENTS.TextInput.Prototype = Prototype;
    return COMPONENTS;

})(oem.Components, oem.Core.Modules.Prototype, oem.Core.Prototypes.Component, oem.Core.Modules.Util.mixin, oem.Core.Mixins.Field);