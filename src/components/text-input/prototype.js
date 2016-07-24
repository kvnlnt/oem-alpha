oem.Components = (function(Components, Core) {

    // Prototype component
    var Prototype = Core.Prototype(Core.Component, {
        type: "TextInput",
        selector: "oem-text-input"
    });

    // mixins
    Core.Util.mixin(Prototype, Core.Field); // mixin field functions

    Prototype.init = function(){
        this.setupInputField();
    };

    Components.TextInput.Prototype = Prototype;
    return Components;

})(oem.Components || {}, oem.Core);