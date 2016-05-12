oem.Components = (function(Components, Core) {

    // Card component
    var Kevin = Object.create(Core.Component); // call super constructor.
    Kevin.name = "Kevin";
    Core.Util.extend(Kevin, Components.KevinModel);
    
    // exports
    Components.Kevin = Kevin;
    return Components;

})(oem.Components || {}, oem.Core);