oem.Components = (function(Components, Core) {

    // Card component
    var Accordion = Object.create(Core.Component); // call super constructor.
    Accordion.name = "Accordion";
    Core.Util.extend(Accordion, Components.AccordionModel);
    
    // exports
    Components.Accordion = Accordion;
    return Components;

})(oem.Components || {}, oem.Core);