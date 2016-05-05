oem.Components = (function(Components, Core) {

    // Card component
    var List = Object.create(Core.Component); // call super constructor.
    List.name = "List";
    Core.Util.extend(List, Components.ListModel);
    
    // exports
    Components.List = List;
    return Components;

})(oem.Components || {}, oem.Core);