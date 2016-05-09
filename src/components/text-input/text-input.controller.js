oem.Components = (function(Components, Core) {

    // Card component
    var TextInput = Object.create(Core.Component); // call super constructor.
    TextInput.name = "TextInput";
    Core.Util.extend(TextInput, Components.TextInputModel);
    
    // exports
    Components.TextInput = TextInput;
    return Components;

})(oem.Components || {}, oem.Core);