ToolhouseUI.Components = (function(Components, Core) {

    // Card component
    var Image = Object.create(Core.Component); // call super constructor.
    Image.name = "Image";
    
    // exports
    Components.Image = Image;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);