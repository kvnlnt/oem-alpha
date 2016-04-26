ToolhouseUI.Components = (function(Components, Core) {

    // Card component
    var %CLASS% = Object.create(Core.Component); // call super constructor.
    %CLASS%.name = "%CLASS%";
    Core.Util.extend(%CLASS%, Components.%CLASS%Model);
    
    // exports
    Components.%CLASS% = %CLASS%;
    return Components;

})(ToolhouseUI.Components || {}, ToolhouseUI.Core);