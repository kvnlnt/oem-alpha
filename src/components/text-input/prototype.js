(function(Components, Core) {

    var Prototype = Core.Prototype(Core.Modules.Component, {
        type: "TextInput",
        selector: "oem-text-input"
    });

    // MIXINS

    Core.Util.mixin(Prototype, Core.Mixins.Field); // mixin field functions

    // INIT

    Prototype.init = function(){
        this.setupInputField();
    };

    Components.TextInput.Prototype = Prototype;
    return Components;

})(oem.Components, oem.Core);