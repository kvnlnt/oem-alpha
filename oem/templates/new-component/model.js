oem.Components = (function(Components, Core) {

    // Card component
    var %CLASS% = oem.create(Core.Component); // call super constructor.
    %CLASS%.name = "%CLASS%";
    %CLASS%.selector = "%SELECTOR%";
    
    // exports
    Components.%CLASS% = %CLASS%;
    return Components;

})(oem.Components || {}, oem.Core);