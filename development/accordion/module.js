(function(COMPONENTS) {

    var Accordion = {};

    Accordion.Params = {
        title: String,
        items: Array.of({
            item: String,
            body: String
        })
    };

    
    // exports
    COMPONENTS.Accordion = Accordion;
    return COMPONENTS;

})(oem.Components);