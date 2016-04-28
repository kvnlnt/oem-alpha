oem.Components = (function(Components, Core) {
    Core.Collector.addComponent('%NAME%', Components.%CLASS%);
    return Components;
})(oem.Components || {}, oem.Core);
