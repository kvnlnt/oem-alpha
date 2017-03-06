(function(COMPONENTS) {

    var Accordion = {};

    Accordion.Params = {
        id: String,
        title: String,
        list: Array.of({
            term: String,
            definition: String,
            expanded: Boolean
        })
    };

    Accordion.Template = '';
    Accordion.Template += '<% this.title %>';
    Accordion.Template += '<dl data-oem-id="<% this.id %>" data-oem="Accordion">';
    Accordion.Template += '<%for(var item in this.list) {%>';
    Accordion.Template += '<dt><% this.list[item].term %></dt>';
    Accordion.Template += '<dd><% this.list[item].definition %></dd>';
    Accordion.Template += '<%}%>';
    Accordion.Template += '</dl>';

    // exports
    COMPONENTS.Accordion = Accordion;
    return COMPONENTS;

})(oem.Components);